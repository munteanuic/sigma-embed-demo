import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      {
        session ? (
          <>
            <h3>User</h3>
            <pre>Welcome {session.user.nickname}</pre>
            { session.user.picture &&
              <img height="64px" src={session.user.picture} />
            }
          </>
        ) : (
          <h3>Welcome! Please log in to use the application</h3>
        )
      }
    </main>
  );
}
