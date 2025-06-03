import type { Session } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { generateJWT } from "./jwt_generator";

// https://help.sigmacomputing.com/docs/example-embed-api-and-url
export const signedEmbedUrl = async (): Promise<string> => {
  const { SIGMA_CLIENT_ID, SIGMA_CLIENT_SECRET, SIGMA_EMBED_PATH } =
    process.env;
  const session = await getSession();
  const jwt = await generateJWT(
    JSON.stringify(
      {
        oauthToken: null,
        expiryInSeconds: 3600,
        sub: "ioana+embed@sigmacomputing.com",
        eval_connection_id: undefined,
        oauth_token: undefined,
        irst_name: "Chester",
        last_name: "Bennington",
        user_attributes: { key: "value" },
        account_type: "creator",
        teams: ["Customers"],
      },
      null,
      2
    ),
    SIGMA_CLIENT_SECRET!,
    SIGMA_CLIENT_ID!,
    session?.accessToken,
    3600 // 1 hour expiry
  );
  try {
    let searchParams = `?:jwt=${jwt}`;
    searchParams += "&:embed=true";
    searchParams += "&:theme=Dark";
    searchParams += "&:menu_position=bottom";

    const URL_WITH_SEARCH_PARAMS = SIGMA_EMBED_PATH + searchParams;
    return URL_WITH_SEARCH_PARAMS.toString();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating embed URL:", error.message);
    }
    throw error;
  }
};
