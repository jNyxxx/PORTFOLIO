import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Nyx — Built with intent",
  description:
    "Junex Glenn Baran. Software engineer and systems builder. Thoughtful architecture, useful automation, and software built with intent.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='8' fill='%23222220'/%3E%3Ctext x='7' y='29' font-family='Arial' font-size='30' fill='%23f1eee7'%3En%3C/text%3E%3C/svg%3E",
  },
};
export const viewport: Viewport = { themeColor: "#f3f4ec" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {["style", "reference", "elevated", "projects", "system"].map(
          (name) => (
            <link key={name} rel="stylesheet" href={`/styles/${name}.css`} />
          ),
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
