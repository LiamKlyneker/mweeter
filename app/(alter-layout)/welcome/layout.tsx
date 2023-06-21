import '../../(default-layout)/globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'mweeter',
  description: 'Welcome to Mweeter!',
};

type WelcomeLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: WelcomeLayoutProps) {
  const { children } = props;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
