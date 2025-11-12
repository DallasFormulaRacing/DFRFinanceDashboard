import { ColumnDef } from "@/app/types/po";

export const icColumns: ColumnDef[] = [
  { key: 'poNumber', label: 'PO #', width: 'w-28' },
  { key: 'date', label: 'Date', width: 'w-28' },
  { key: 'vendor', label: 'Vendor', width: 'w-40' },
  { key: 'description', label: 'Description', width: 'w-64' },
  { key: 'category', label: 'Category', width: 'w-32' },
  { key: 'quantity', label: 'Qty', width: 'w-20' },
  { key: 'unitCost', label: 'Unit Cost', width: 'w-28' },
  { key: 'totalCost', label: 'Total', width: 'w-32' },
  { key: 'requestedBy', label: 'Requested By', width: 'w-36' },
  { key: 'status', label: 'Status', width: 'w-28' },
];