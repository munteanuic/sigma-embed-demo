import { signedEmbedUrl } from "@/lib/sigma";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import React from "react";
import SigmaCrane from "./static/sigmacrane.png";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return (
      <main>
        <pre>Welcome to the Sigma Embedded Data Apps Demo</pre>
        <Image height={200} src={SigmaCrane} alt="see yourself in the data" />
      </main>
    );
  }

  const embedUrl = await signedEmbedUrl();

  return (
    <main>
      {
        <>
          <iframe
            style={{ height: "700px", width: "100%" }}
            src={embedUrl}
            frameBorder="0"
          />
        </>
      }
    </main>
  );
}
