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
import { samplePOs } from "@/lib/poSampleData";
import AddPurchaseOrderForm from "./AddPurchaseOrder";

const getStatusVariant = (status: POStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "pending":
      return "outline";
    case "approved":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
};

const getStatusColor = (status: POStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100";
    case "approved":
      return "bg-green-100 text-green-800 border-green-300 hover:bg-green-100";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-300 hover:bg-red-100";
    default:
      return "";
  }
};

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const renderCellValue = (po: PurchaseOrder, columnKey: keyof PurchaseOrder) => {
  const value = po[columnKey];

  switch (columnKey) {
    case "unitCost":
    case "totalCost":
      return formatCurrency(value as number);
    case "status":
      return (
        <Badge variant={getStatusVariant(value as POStatus)} className={getStatusColor(value as POStatus)}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      );
    default:
      return value || "-";
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
  
  // Filter states
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFromFilter, setDateFromFilter] = useState<string>("");
  const [dateToFilter, setDateToFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Load initial data when team changes
  useEffect(() => {
    const filteredPOs = samplePOs.filter((po) => po.subteam === team);
    setPoList(filteredPOs);
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

  const handleAddPO = (newPO: PurchaseOrder) => {
    setPoList([newPO, ...poList]);
    setShowForm(false);
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