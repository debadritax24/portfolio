import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin Panel | Debadrita Goswami",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111318",
            color: "#e2e8f0",
            border: "1px solid #1e293b",
          },
        }}
      />
      {children}
    </>
  );
}
