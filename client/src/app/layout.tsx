import { SearchProvider } from "@/context/SearchContext"
import "./globals.css"
import { cn } from "@/lib/utils";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
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
      <body className={vazir.className}>
        <SearchProvider>
          <Navbar/>
          {children}
        </SearchProvider>
      </body>
    </html>
  )
}