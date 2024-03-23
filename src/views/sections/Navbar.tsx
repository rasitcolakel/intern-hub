"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { paths } from "@/common/paths";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const links = [
  { href: paths.home, label: "Anasayfa" },
  { href: paths.jobs, label: "İş İlanları" },
  { href: paths.interns, label: "Stajyerler" },
];

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname();

  const activeLink = links.find(({ href }) => href === pathname);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 py-2", className)}
      {...props}
    >
      <div>logo</div>
      <div className="flex-1 flex justify-center space-x-4">
        {links.map(({ href, label }) => (
          <Button
            asChild
            key={href}
            variant={activeLink?.href === href ? "default" : "ghost"}
          >
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
}
