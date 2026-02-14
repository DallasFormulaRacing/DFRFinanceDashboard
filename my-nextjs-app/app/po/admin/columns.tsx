import { ColumnDef } from "@/app/types/po";

export const adminColumns: ColumnDef[] = [
  { key: 'poNumber', label: 'PO #', width: 'w-28' },
  { key: 'date', label: 'Date', width: 'w-28' },
  { key: 'vendor', label: 'Vendor', width: 'w-48' },
  { key: 'description', label: 'Description', width: 'w-64' },
  { key: 'totalCost', label: 'Total Cost', width: 'w-32' },
  { key: 'requestedBy', label: 'Requested By', width: 'w-36' },
  { key: 'status', label: 'Status', width: 'w-28' },
  { key: 'notes', label: 'Notes', width: 'w-48' },
];