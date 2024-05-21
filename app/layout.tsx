import type { Metadata } from "next";
import { josefinSans } from "./ui/fonts";
import "@styles/globals.css";
import { Providers } from "./providers";

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
        className={`${josefinSans.className} grid h-svh w-svw place-items-center  gap-0 bg-clr-app-bg text-left text-lg antialiased md:h-screen md:w-full`}
      >
        <Providers>
          <main className="grid h-svh w-svw px-6 md:max-w-[90rem]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

// suppressHydrationWarning
