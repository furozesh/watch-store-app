import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import {Toaster} from 'sonner'
const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: '--font-vazirmatn',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      {/* vazir.className رو برگردوندیم تا فونت کل پروژه درست بشه */}
      <body className={`min-h-screen flex flex-col ${vazir.variable} ${vazir.className}`}>
        <SearchProvider>
          <LayoutWrapper>
            <Toaster
              position="bottom-right"
              richColors
              closeButton
              duration={2500}
              expand={false}
              dir="rtl" // برای راست‌چین شدن Sonner
              className={vazir.className} // اعمال مستقیم کلاس فونت به کانتینر Sonner
              toastOptions={{
                classNames: {
                  toast:` rounded-2xl border shadow-xl text-sm ${vazir.className}`,
                  title: "font-semibold",
                  description: "text-slate-500",
                  success: "!bg-emerald-50 !border-emerald-200",
                  error: "!bg-red-50 !border-red-200",
                  warning: "!bg-amber-50 !border-amber-200",
                  info: "!bg-blue-50 !border-blue-200",
                },
              }}
            />
            {children}
          </LayoutWrapper>
        </SearchProvider>
      </body>
    </html>
  );
}