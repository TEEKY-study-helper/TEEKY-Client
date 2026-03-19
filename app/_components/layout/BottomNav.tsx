"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, ClipboardList, CircleUserRound } from "lucide-react";
import { cn } from "@/app/_lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/friends", icon: Heart, label: "친구" },
  { href: "/tasks", icon: ClipboardList, label: "태스크" },
  { href: "/my", icon: CircleUserRound, label: "마이" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] z-10 border-t border-border/50 bg-card/80 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute -top-1 h-0.5 w-5 rounded-full bg-primary" />
              )}
              <item.icon
                className={cn("size-5 transition-all", isActive && "scale-110")}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={cn(
                  "text-[10px] transition-all",
                  isActive ? "font-bold" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
