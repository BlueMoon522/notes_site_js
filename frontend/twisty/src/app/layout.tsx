"use client";
// export const metadata = {
//   title: "THE ALL IN ONE",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import Sidenav from "./components/sidenav/sidenav";
import { usePathname } from "next/navigation"; // Ensure this import is present

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide the sidenav for /login and /register routes
  const hideSidenav = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body>
        {!hideSidenav && <Sidenav />}
        <main style={{ marginLeft: !hideSidenav ? "250px" : "0" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
