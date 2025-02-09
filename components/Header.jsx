import React from "react";
import { AudioLines, Search, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-chart-5 p-4">
      <div className="flex items-center justify-between max-w-[80vw] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">Holler</h1>
          <AudioLines className="w-6 h-6 text-primary" />
        </Link>

        <nav>
          <ul className="flex space-x-6 text-primary">
            <li>
              <Search className="w-6 h-6" />
            </li>
            <li>
              <Bell className="w-6 h-6" />
            </li>
            <li>
              <User className="w-6 h-6" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
