"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@/app/_components/icons/HomeIcon";
import { HeartIcon } from "@/app/_components/icons/HeartIcon";
import { ChecklistIcon } from "@/app/_components/icons/ChecklistIcon";
import { ProfileIcon } from "@/app/_components/icons/ProfileIcon";

const navItems = [
  { href: "/", icon: HomeIcon, label: "홈" },
  { href: "/friends", icon: HeartIcon, label: "친구" },
  { href: "/tasks", icon: ChecklistIcon, label: "태스크" },
  { href: "/my", icon: ProfileIcon, label: "마이" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] h-[68px] bg-[#eeeeee] rounded-t-[25px] shadow-[0px_-3px_4px_0px_rgba(0,0,0,0.08)] z-10">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex flex-col items-center gap-1",
                isActive ? "text-black" : "text-black/60",
              ].join(" ")}
            >
              <item.icon className="size-[28px]" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
