import I18nProvider from "@/components/config/I18nProvider";
import Header from "@/components/Header";
import '@/styles/globals.scss';

export const metadata = {
  title: "Artist",
  description: "A place for artists and their creativity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
