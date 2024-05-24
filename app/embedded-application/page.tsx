import React from 'react';
import { signedEmbedUrl } from '@/lib/sigma';
import { getSession } from '@auth0/nextjs-auth0';
export default async function Page() {
  const session = await getSession();
  const embedUrl = await signedEmbedUrl();
  console.log(session);

  return (
    <main>
        <h3>Submit Your Airport Reviews</h3>
        <div className='box'>
          <iframe style={ { height: '400px', width: '400px' } } src={embedUrl} frameBorder="0" />
        </div>
    </main>
  );
}
