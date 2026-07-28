import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import {Toaster} from 'sonner'
export const dynamic = 'force-dynamic'

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
      <body className={`min-h-screen flex flex-col ${vazir.variable} ${vazir.className}`}>
        <SearchProvider>
          <LayoutWrapper>
            <Toaster
              position="bottom-right"
              richColors
              closeButton
              duration={2500}
              expand={false}
              dir="rtl"
              className={vazir.className}
              toastOptions={{
                classNames: {
                  toast:` rounded-3xl border shadow-lg text-base ${vazir.className}`,
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