import type { Metadata } from "next";
import { josefinSans } from "./ui/fonts";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "ToDo App",
  description: "Frontend Mentor challenge to build ToDo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} bg-clr-app-bg grid h-svh w-svw  place-items-center gap-0 text-left text-lg antialiased md:h-screen md:w-full`}
      >
        <main className="grid h-svh w-svw px-6 md:max-w-[90rem]">
          {children}
        </main>
      </body>
    </html>
  );
}
