// app/po/layout.tsx
"use client";

import React from "react";

export default function PurchaseOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen p-6 bg-white text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[black]">Purchase Orders</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}
