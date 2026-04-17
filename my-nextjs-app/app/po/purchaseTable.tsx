"use client";

import { useState, useEffect, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PurchaseOrder, POStatus, ColumnDef, Subteam } from "@/app/types/po";
import { icColumns } from "./ic/columns";
import { evColumns } from "./ev/columns";
import { adminColumns } from "./admin/columns";
import AddPurchaseOrderForm from "./AddPurchaseOrder";
import { supabase } from "@/lib/supabase";

const normalizeSubteam = (value: unknown): Subteam | null => {
  if (!value || typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (normalized === "ev") return "EV";
  if (normalized === "ic") return "IC";
  if (normalized === "admin") return "Admin";
  if (normalized === "f1tenth" || normalized === "f1 tenth") return "F1Tenth";

  return null;
};

const getStatusVariant = (status: POStatus): "default" | "secondary" | "destructive" | "outline" => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending") || s.includes("open")) return "outline";
  if (s.includes("approv") || s.includes("accept")) return "default"; // Covers "approved", "accepted"
  if (s.includes("reject") || s.includes("deni")) return "destructive"; // Covers "rejected", "denied"
  
  return "secondary"; // Default for unknown statuses
};

const getStatusColor = (status: POStatus): string => {
  const s = (status || "").toLowerCase();
  
  if (s.includes("pending") || s.includes("open")) {
    return "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100";
  }
  if (s.includes("approv") || s.includes("accept")) {
    return "bg-green-100 text-green-800 border-green-300 hover:bg-green-100";
  }
  if (s.includes("reject") || s.includes("deni")) {
    return "bg-red-100 text-red-800 border-red-300 hover:bg-red-100";
  }
  
  return ""; // Default (gray/secondary)
};

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const renderCellValue = (po: PurchaseOrder, columnKey: keyof PurchaseOrder) => {
  const value = po[columnKey];

  // if (value === null || value === undefined) return "-"; // Removed this check to allow status logic to run

  switch (columnKey) {
    case "unitCost":
    case "totalCost":
      return formatCurrency(value as number);
    case "status":
      // Use the raw value, defaulting to 'Unknown' if truly missing
      const statusValue = (value as POStatus) || "Unknown";
      return (
        <Badge variant={getStatusVariant(statusValue)} className={getStatusColor(statusValue)}>
          {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
        </Badge>
      );
    default:
      if (value === null || value === undefined) return "-";
      return value;
  }
};

const getColumnsForTeam = (team: string): ColumnDef[] => {
  switch (team) {
    case "IC":
      return icColumns;
    case "EV":
      return evColumns;
    case "Admin":
      return adminColumns;
    default:
      return icColumns;
  }
};

export default function PurchaseTable({ team }: { team: Subteam }) {
  const [poList, setPoList] = useState<PurchaseOrder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Filter states
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFromFilter, setDateFromFilter] = useState<string>("");
  const [dateToFilter, setDateToFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Fetch data from Supabase
  const fetchPOs = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const teamFilter = team;
      let query = supabase
        .from('purchase_orders')
        .select('*')
        .order('poID', { ascending: false });

      // Keep all team views scoped to their own rows (case-insensitive).
      query = query.ilike('subteam', teamFilter);

      const { data, error } = await query;

      if (error) {
        setFetchError(error.message || "Failed to fetch purchase orders.");
        setPoList([]);
        console.error("Error fetching POs details:", JSON.stringify(error, null, 2));
        return;
      }

      if (data) {
        console.log("Raw Supabase Data:", data); // Debugging log
        // Map database columns to our frontend PurchaseOrder interface
        const mappedData: PurchaseOrder[] = data.map((item: any) => ({
          subteam: normalizeSubteam(item.subteam) || normalizeSubteam(item.comp) || team,
          id: String(item.poID), // Convert number ID to string if needed
          poNumber: item.purchaseNumber || 'N/A',
          date: item.dateRequested || new Date().toISOString().split('T')[0], // Fallback if null
          // Prefer new columns, keep legacy fallback for old rows during migration.
          vendor: item.vendor || 'Unknown Vendor',
          description: item.description || item.name || 'No Description',
          category: item.category || 'Uncategorized',
          quantity: 1, // Missing in DB source, default to 1
          unitCost: Number(item.amount) || 0,
          totalCost: Number(item.amount) || 0, // Using amount as total cost since qty is unknown
          requestedBy: 'Unknown', // Missing in DB source
          status: (item.status || 'pending') as POStatus, // Use DB status or default
          notes: '',
          expectedDelivery: undefined
        }));
        setPoList(mappedData.filter((po) => po.subteam === team));
      }
    } catch (err) {
      setFetchError("Unexpected error while loading purchase orders.");
      setPoList([]);
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data when team changes
  useEffect(() => {
    fetchPOs();
  }, [team]);

  // Get unique vendors and categories for filter dropdowns
  const uniqueVendors = useMemo(() => {
    return Array.from(new Set(poList.map(po => po.vendor))).sort();
  }, [poList]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(poList.map(po => po.category))).sort();
  }, [poList]);

  // Apply filters
  const filteredPOs = useMemo(() => {
    return poList.filter((po) => {
      // Vendor filter
      if (vendorFilter && !po.vendor.toLowerCase().includes(vendorFilter.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && po.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "all" && po.category !== categoryFilter) {
        return false;
      }

      // Date from filter
      if (dateFromFilter && po.date < dateFromFilter) {
        return false;
      }

      // Date to filter
      if (dateToFilter && po.date > dateToFilter) {
        return false;
      }

      return true;
    });
  }, [poList, vendorFilter, statusFilter, categoryFilter, dateFromFilter, dateToFilter]);

  const columns = getColumnsForTeam(team);
  const totalSpend = filteredPOs.reduce((sum, po) => sum + po.totalCost, 0);

  const handleAddPO = async (newPO: PurchaseOrder) => {
    try {
      // Map domain object back to snake_case DB columns for insertion
      const { error } = await supabase
        .from('purchase_orders')
        .insert({
          po_number: newPO.poNumber,
          date: newPO.date,
          vendor: newPO.vendor,
          description: newPO.description,
          category: newPO.category,
          quantity: newPO.quantity,
          unit_cost: newPO.unitCost,
          // total_cost is generated but we can pass it if we want to override or if DB expects it. It's stored/generated.
          requested_by: newPO.requestedBy,
          status: newPO.status,
          subteam: newPO.subteam,
          notes: newPO.notes, 
          expected_delivery: newPO.expectedDelivery
        });

      if (error) {
        console.error("Error adding PO:", error);
        alert("Failed to add PO: " + error.message);
        return;
      }
      
      // Refresh list
      setShowForm(false);
      fetchPOs();
    } catch (err) {
      console.error("Error adding PO:", err);
    }
  };

  const handleClearFilters = () => {
    setVendorFilter("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setDateFromFilter("");
    setDateToFilter("");
  };

  const activeFilterCount = [
    vendorFilter,
    statusFilter !== "all",
    categoryFilter !== "all",
    dateFromFilter,
    dateToFilter
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{filteredPOs.length}</strong> of <strong className="text-foreground">{poList.length}</strong> purchase order{poList.length !== 1 ? "s" : ""} for{" "}
            <strong className="text-foreground">{team}</strong>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Total Spend: <strong className="text-foreground">{formatCurrency(totalSpend)}</strong>
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Purchase Order"}</Button>
      </div>

      {showForm && <AddPurchaseOrderForm subteam={team} onAdd={handleAddPO} onCancel={() => setShowForm(false)} />}

      {fetchError && (
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
          Failed to load purchase orders: {fetchError}
        </div>
      )}

      {/* FILTER BAR: filter table by subparameters */}
      <div className="border rounded-lg p-4 bg-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear all ({activeFilterCount})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Vendor Search */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Vendor</label>
            <Input
              placeholder="Search vendor..."
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="h-9"
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Date From</label>
            <Input
              type="date"
              value={dateFromFilter}
              onChange={(e) => setDateFromFilter(e.target.value)}
              className="h-9"
            />
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Date To</label>
            <Input
              type="date"
              value={dateToFilter}
              onChange={(e) => setDateToFilter(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={col.width}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPOs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  {poList.length === 0 
                    ? `No purchase orders found for ${team}`
                    : "No purchase orders match the current filters"}
                </TableCell>
              </TableRow>
            ) : (
              filteredPOs.map((po) => (
                <TableRow key={po.id} className="hover:bg-muted/50">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {renderCellValue(po, col.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}