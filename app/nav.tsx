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
            <li>
              <Link href="/" legacyBehavior>
                <a>Home</a>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/embedded-application" legacyBehavior>
                    <a>Embedded Application</a>
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
