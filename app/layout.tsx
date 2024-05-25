import type { Metadata } from "next";
import { josefinSans } from "./ui/fonts";
import "@styles/globals.css";
import { Providers } from "./providers";
import ThemeBgImage from "@components/ThemeBgImage";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${josefinSans.className} grid h-svh w-svw place-items-center  gap-0 bg-clr-app-bg text-left text-lg antialiased md:h-screen md:w-full`}
      >
        <Providers>
          <div className="absolute top-0 -z-10 h-[200px] w-full overflow-hidden md:h-[300px]">
            <ThemeBgImage />
          </div>
          <main className="grid h-svh w-svw px-6 md:max-w-[90rem]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

// inside html: suppressHydrationWarning - to avoid Hydration error due to extra class of light or dark
