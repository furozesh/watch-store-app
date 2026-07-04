import { SearchProvider } from "@/context/SearchContext"
import "./globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          {children}
        </SearchProvider>
      </body>
    </html>
  )
}