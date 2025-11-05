"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define types for link structure
interface Sublink {
  name: string;
  href: string;
}

interface LinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
  sublinks?: Sublink[];
}

export default function Sidebar() {
  const pathname = usePathname();

  // collapse/expand state setter
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // sidebar options with links
  const links: LinkItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Purchase Orders", href: "/po", icon: FileText},
    { name: "Cost Centers", href: "/cc", icon: Building2 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Log Out", href: "/login", icon: LogOut },
  ];

  return (
    <aside
      className={`h-screen bg-black text-white flex flex-col p-4 transition-width duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* collapse/expand button functionality*/}
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h2 className="text-2xl font-bold tracking-wide text-[#ff8c1a]">
            DFR Finance
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#ff8c1a]"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <Separator className="mb-4 bg-white/10" />

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {links.map(({ name, href, icon: Icon, sublinks }) =>
          // if sublinks exist for a button: special design w/ DropdownMenu
          sublinks ? (
            <DropdownMenu key={name} modal={false}>
              <DropdownMenuTrigger asChild>
                {/* main button */}
                <Button
                  variant="ghost"
                  className={`w-full rounded-md text-white transition-colors duration-200 ${
                    pathname === href || pathname.startsWith(href + "/")
                      ? "bg-[#ff8c1a] text-black"
                      : "hover:bg-[#ff8c1a]/90 hover:text-black"
                  } ${
                    collapsed
                      ? "p-2 flex justify-center"
                      : "px-3 py-2 flex justify-start gap-3"
                  }`}
                >
                  <Icon size={18} />
                  {!collapsed && <span>{name}</span>}
                </Button>
              </DropdownMenuTrigger>
              {!collapsed && (
                // sublink "buttons" as dropdown content
                <DropdownMenuContent
                  className="bg-black text-white border-none ml-4"
                  align="start"
                >
                  {sublinks.map((sub) => (
                    <DropdownMenuItem
                      key={sub.name}
                      asChild
                      className={`hover:bg-[#ff8c1a]/90 hover:text-black focus:bg-[#ff8c1a]/90 focus:text-black ${
                        pathname === sub.href ? "bg-[#ff8c1a] text-black" : ""
                      }`}
                    >
                      <Link href={sub.href}>{sub.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ) : (
            // else, sublinks do not exist: regular button design
            <Button
              key={name}
              variant="ghost"
              asChild
              className={`w-full rounded-md text-white transition-colors duration-200 ${
                pathname === href
                  ? "bg-[#ff8c1a] text-black"
                  : "hover:bg-[#ff8c1a]/90 hover:text-black"
              } ${
                collapsed
                  ? "p-2 flex justify-center"
                  : "px-3 py-2 flex justify-start gap-3"
              }`}
            >
              <Link
                href={href}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                }`}
              >
                <Icon size={18} />
                {!collapsed && <span>{name}</span>}
              </Link>
            </Button>
          )
        )}
      </nav>
    </aside>
  );
}
