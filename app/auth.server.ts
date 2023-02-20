import { createCookie, createCookieSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';

export const logoutUrl = `https://${
	process.env.AUTH0_DOMAIN
}/v2/logout?returnTo=${encodeURIComponent(
	'http://localhost:3000/'
)}&client_id=${process.env.AUTH0_CLIENT_ID}`;

export const authCookie = createCookie('auth0', {
	httpOnly: true,
	maxAge: 60 * 20,
	secure: false, // localhost only so far
});

const sessionStorage = createCookieSessionStorage({
	cookie: authCookie,
});

export function getSession(
	cookieHeader: Parameters<typeof sessionStorage.getSession>[0]
) {
	return sessionStorage.getSession(cookieHeader);
}

export function destroySession(
	session: Awaited<ReturnType<typeof getSession>>
) {
	return sessionStorage.destroySession(session);
}

export type AuthProfile = {
	email: string;
	token: string;
};

export const authenticator = new Authenticator<AuthProfile>(sessionStorage, {
	sessionKey: 'session',
	sessionStrategyKey: 'auth0',
	sessionErrorKey: 'auth0Error',
});

authenticator.use(
	new Auth0Strategy(
		{
			clientID: process.env.AUTH0_CLIENT_ID!,
			clientSecret: process.env.AUTH0_CLIENT_SECRET!,
			callbackURL: 'http://localhost:3000/auth/callback',
			domain: process.env.AUTH0_DOMAIN!,
			scope: 'offline_access openid profile email',
		},
		async ({ accessToken, profile }) => {
			return {
				email: profile.emails![0].value,
				token: accessToken,
			};
		}
	)
);
