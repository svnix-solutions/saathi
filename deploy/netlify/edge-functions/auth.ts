// Asks for a username and password before anything on the demo is served (HTTP Basic auth).
// The login lives in the site's Netlify settings, never in this repo:
//   npx netlify-cli env:set DEMO_USER <name>   and   npx netlify-cli env:set DEMO_PASSWORD <password>
// If either is missing the site stays closed rather than open.
declare const Netlify: { env: { get(key: string): string | undefined } };

const sameText = (a: string, b: string) => {   // compares every character, so timing does not reveal how much matched
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
};

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const user = Netlify.env.get("DEMO_USER");
  const password = Netlify.env.get("DEMO_PASSWORD");
  if (!user || !password) return new Response("The demo login is not set up yet.", { status: 503 });
  if (sameText(request.headers.get("authorization") ?? "", "Basic " + btoa(`${user}:${password}`))) return context.next();
  return new Response("Sign in to see the Saathi demo.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Saathi demo", charset="UTF-8"', "Cache-Control": "no-store" },
  });
};
