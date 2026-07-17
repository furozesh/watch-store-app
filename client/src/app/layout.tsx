import { SearchProvider } from "@/context/SearchContext"
import "./globals.css"
import { cn } from "@/lib/utils";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";
const vazir = Vazirmatn({
  subsets: ["arabic"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`min-h-screen flex flex-col ${vazir.className}`}>
        <SearchProvider>
          <VisitorTracker />

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </SearchProvider>
      </body>
    </html>
  )
}