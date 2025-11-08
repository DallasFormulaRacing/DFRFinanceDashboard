// app/dashboard/layout.tsx
"use client";

import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-white p-8">
      <main>{children}</main>
    </section>
  );
}
