import type { Metadata } from "next";
import {Inter,Poppins,Roboto_Mono} from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const poppins = Poppins({
  subsets:['latin'],
  weight : ['100' , '200' , '300' ,'500' , '800'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Property rentals",
  description: "Découvrez votre prochaine location. Parcourez une large gamme d'appartements, maisons et locations de vacances. Trouvez l'espace parfait grâce à des filtres de recherche simples et des annonces détaillées. Commencez votre aventure locative dès aujourd'hui !",
  keywords:'locations immobilières, maisons à louer, appartements à louer, annonces de location, trouver une location, locations de vacances, options de bail, louer une propriété en ligne'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_mono.variable}`}
      >  
        <Providers>{children}</Providers>
      </body>
    </html>

  );
}
