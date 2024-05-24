import type { Session } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import crypto from 'crypto';

const getUserAssignment = (session: Session): { userId: string, email: string, teams: string[] } => {
  // todo: implement your own logic for determining the user's id, email, and teams
  const teams = ['matts team'];
  const email = session.user.sigmaEmbed.email;
  const userId = session.user.sub.split("|")[1];

  return { userId, email, teams };
}

// https://help.sigmacomputing.com/docs/example-embed-api-and-url
export const signedEmbedUrl = async (): Promise<string> => {
  const { SIGMA_CLIENT_ID, SIGMA_CLIENT_SECRET, SIGMA_EMBED_PATH } = process.env;
  const session = await getSession();
  const { userId, email, teams } = getUserAssignment(session!);
  try {
    const nonce = crypto.randomUUID();
    let searchParams = `?:nonce=${nonce}`;
    searchParams += `&:client_id=${SIGMA_CLIENT_ID}`;
    searchParams += `&:email=${email}`;
    searchParams += `&:external_user_id=${userId}`;
    searchParams += `&:external_user_team=${teams.map(encodeURIComponent).join(',')}`;
    searchParams += '&:account_type=Pro';
    searchParams += '&:mode=userbacked';
    searchParams += '&:session_length=600';
    searchParams += '&:show_footer=false';
    searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;

    const URL_WITH_SEARCH_PARAMS = SIGMA_EMBED_PATH + searchParams;

    const SIGNATURE = crypto
      .createHmac('sha256', Buffer.from(SIGMA_CLIENT_SECRET!, 'utf8'))
      .update(Buffer.from(URL_WITH_SEARCH_PARAMS.toString(), 'utf8'))
      .digest('hex');

    const signedUrl = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;
    return signedUrl.toString();
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.error('Error generating embed URL:', error.message);
    }
    throw error;
  }
}