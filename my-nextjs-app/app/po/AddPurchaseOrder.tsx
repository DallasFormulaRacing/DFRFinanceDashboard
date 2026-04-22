"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PurchaseOrder, Subteam } from "@/app/types/po";

interface AddPurchaseOrderFormProps {
  subteam: Subteam;
  onAdd: (po: PurchaseOrder) => void;
  onCancel: () => void;
}

function createEmptyPO(subteam: Subteam): PurchaseOrder {
  return {
    id: "",
    poNumber: "",
    date: "",
    vendor: "",
    category: "",
    requestedBy: "",
    subteam,
    description: "",
    unitCost: 0,
    quantity: 0,
    totalCost: 0,
    status: "pending",
  };
}

export default function AddPurchaseOrderForm({ subteam, onAdd, onCancel }: AddPurchaseOrderFormProps) {
  const [newPO, setNewPO] = useState<PurchaseOrder>(createEmptyPO(subteam));

  const handleInputChange = (field: keyof PurchaseOrder, value: string | number) => {
    const updated = { ...newPO, [field]: value };

    if (field === "unitCost" || field === "quantity") {
      const unitCost = field === "unitCost" ? Number(value) : Number(newPO.unitCost);
      const quantity = field === "quantity" ? Number(value) : Number(newPO.quantity);
      updated.totalCost = unitCost * quantity;
    }

    setNewPO(updated);
  };

  const handleSubmit = () => {
    if (
      !newPO.id ||
      !newPO.poNumber ||
      !newPO.date ||
      !newPO.vendor ||
      !newPO.category ||
      !newPO.requestedBy ||
      !newPO.description ||
      newPO.unitCost <= 0 ||
      newPO.quantity <= 0
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }
    onAdd(newPO);
    setNewPO(createEmptyPO(subteam));
  };

  return (
    <div className="border rounded-lg p-6 bg-card space-y-6">
      <h2 className="text-lg font-semibold">Add New Purchase Order</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="po-id">PO ID</Label>
          <Input
            id="po-id"
            placeholder="Enter PO ID"
            value={newPO.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="po-number">PO Number</Label>
          <Input
            id="po-number"
            placeholder="Enter PO Number"
            value={newPO.poNumber}
            onChange={(e) => handleInputChange("poNumber", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={newPO.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            placeholder="Enter Vendor Name"
            value={newPO.vendor}
            onChange={(e) => handleInputChange("vendor", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter Category"
            value={newPO.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requested-by">Requested By</Label>
          <Input
            id="requested-by"
            placeholder="Enter Name"
            value={newPO.requestedBy}
            onChange={(e) => handleInputChange("requestedBy", e.target.value)}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter Description"
            value={newPO.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit-cost">Unit Cost</Label>
          <Input
            id="unit-cost"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={newPO.unitCost || ""}
            onChange={(e) => handleInputChange("unitCost", parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="0"
            placeholder="0"
            value={newPO.quantity || ""}
            onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            value={newPO.status}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-cost">Total Cost</Label>
          <Input
            id="total-cost"
            value={`$${newPO.totalCost.toFixed(2)}`}
            disabled
            className="bg-muted font-semibold"
          />
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button onClick={handleSubmit}>Add Purchase Order</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}