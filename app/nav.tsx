'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Nav() {
  const { user } = useUser();
  const pathname = usePathname();
  const pageName = pathname?.split('/').pop();

  return (
    <>
      <div className={`header ${pageName || 'home'}`}>
        <nav>
          <ul>
            {user ? (
              <>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>Sales Analysis</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/auth/logout" data-testid="logout">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/auth/login" data-testid="login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
