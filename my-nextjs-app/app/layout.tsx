import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
export const metadata: Metadata = {
  title: "DFR Finance Dashboard",
  description: "Track finances for DFR subteams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-black min-h-screen">
        <Sidebar /> 
        {/* // collapsible="offcanvas" /> */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
