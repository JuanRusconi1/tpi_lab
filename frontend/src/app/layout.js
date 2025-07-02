import "../styles/globals.css";

export const metadata = {
  title: "Velia",
  description: "Desarrollada para el Trabajo Practico de Laboratorio 4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
