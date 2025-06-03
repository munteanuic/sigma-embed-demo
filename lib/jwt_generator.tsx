import { v4 as uuid } from "uuid";
import * as jose from "jose";
import crypto from "crypto-js";

export async function generateJWT(
  jsonObject: string,
  embedSecret: string,
  embedClientID: string,
  oauthToken?: string,
  expiryInSeconds = 3600
): Promise<string> {
  let jsonObjectParsed = JSON.parse(jsonObject);
  if (oauthToken) {
    const finalOauthToken = crypto.AES.encrypt(
      oauthToken,
      embedSecret
    ).toString();
    jsonObjectParsed = { ...jsonObjectParsed, oauth_token: finalOauthToken };
  }

  const secret = new TextEncoder().encode(embedSecret);
  const alg = "HS256";
  const jwt = await new jose.SignJWT(jsonObjectParsed)
    .setProtectedHeader({ alg, kid: embedClientID })
    .setIssuedAt()
    .setIssuer(embedClientID)
    .setJti(uuid())
    .setExpirationTime(`${expiryInSeconds}sec`)
    .sign(secret);
  return jwt;
}
