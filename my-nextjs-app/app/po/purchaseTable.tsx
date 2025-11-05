"use client"

export default function PurchaseTable({ team }: { team: string }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-muted-foreground">
        Showing purchase orders for <strong>{team}</strong>
      </p>
    </div>
  )
}