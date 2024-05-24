import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Nav from '@/app/nav';

export const metadata = {
  title: 'Sigma Demo',
  description: 'Demoing how easy it is to set up a Sigma embed'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <header>
            <Nav />
          </header>
          <div className="container">{children}</div>
        </body>
      </UserProvider>
    </html>
  );
}
