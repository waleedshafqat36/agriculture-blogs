"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/auth/login" || pathname === "/auth/register";
  const hideFooter = pathname === "/Admin" || pathname.startsWith("/blogs");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
