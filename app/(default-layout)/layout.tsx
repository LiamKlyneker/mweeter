import Nav from '@/ui/components/nav';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import UserProvider from '@/utils/user-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'mweeter',
  description: 'A nice Twitter prototype',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="mx-auto flex max-w-screen-xl">
              <Nav />
              <main className="flex-1 px-10 py-12">{children}</main>
            </div>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
