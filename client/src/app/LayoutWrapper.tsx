"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VisitorTracker from "@/components/VisitorTracker";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";
  if (isAuthPage) {
    return <>{children}</>;
  }
  return (
    <>
      <VisitorTracker />
      <Navbar/>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}