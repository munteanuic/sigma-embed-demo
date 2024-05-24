import React from 'react';
import { signedEmbedUrl } from '@/lib/sigma';
import { getSession } from '@auth0/nextjs-auth0';
export default async function Page() {
  const session = await getSession();
  const embedUrl = await signedEmbedUrl();
  console.log(session);

  return (
    <main>
        <h3>Your Sigma Embed</h3>
        {/*<h2>Page:</h2>*/}
        <iframe style={ { height: '800px'} } src={embedUrl} frameBorder="0" />
    </main>
  );
}
