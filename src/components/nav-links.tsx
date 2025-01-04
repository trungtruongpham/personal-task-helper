"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex mb-6 max-w-4xl mx-auto px-8 w-full py-4 md:px-0">
      <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            pathname === "/tasks"
              ? "bg-background text-foreground shadow-sm"
              : "hover:bg-background/50 hover:text-foreground"
          )}
        >
          Tasks
        </Link>
        <Link
          href="/goals"
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            pathname === "/goals"
              ? "bg-background text-foreground shadow-sm"
              : "hover:bg-background/50 hover:text-foreground"
          )}
        >
          Goals
        </Link>
      </div>
    </nav>
  );
}
