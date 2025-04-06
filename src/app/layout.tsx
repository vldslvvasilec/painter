import I18nProvider from "@/components/config/I18nProvider";
import Header from "@/components/Header";
import '@/styles/globals.scss';

export const metadata = {
  title: "Philippe Thorin",
  description: "Explore the creative portfolio of Philippe Thorin, featuring innovative projects and inspiring works for artists and art enthusiasts.",
  openGraph: {
    title: "Philippe Thorin",
    description: "Discover Philippe Thorin's creative portfolio, showcasing unique artistic expressions and projects. Ideal for art lovers and creative professionals.",
    url: "https://www.philippethtorin.com",  // Замените на ваш URL
    site_name: "Philippe Thorin",
  },
  twitter: {
    card: "summary_large_image", // Карточка с текстом, но без изображения
    title: "Philippe Thorin",
    description: "Philippe Thorin’s portfolio features innovative projects and creative works, ideal for those looking for inspiration and artistic ideas.",
  },
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
