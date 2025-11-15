// types/po.ts

// Status options for a purchase order
export type POStatus = 'pending' | 'approved' | 'rejected';

// Team/subteam options
export type Subteam = 'EV' | 'IC' | 'Admin';

// Main Purchase Order interface - defines the shape of a PO object
export interface PurchaseOrder {
  id: string;
  poNumber: string;              // e.g., "PO-2024-001"
  date: string;                  // Date PO was created
  vendor: string;                // Supplier/vendor name
  description: string;           // What's being purchased
  category: string;              // e.g., "Powertrain", "Chassis", "Marketing"
  quantity: number;              // Number of items
  unitCost: number;              // Cost per unit
  totalCost: number;             // Total cost (quantity × unitCost)
  requestedBy: string;           // Team member who requested it
  status: POStatus;              // Current status of the PO
  subteam: Subteam;             // Which team this belongs to
  notes?: string;                // Optional notes (mainly for Admin)
  expectedDelivery?: string;     // Optional delivery date (mainly for EV)
}

// Column definition interface - used by columns.ts files
export interface ColumnDef {
  key: keyof PurchaseOrder;      // Must be a valid key from PurchaseOrder
  label: string;                 // Display name for the column header
  width?: string;                // Optional Tailwind width class
}
