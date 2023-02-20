import type { ActionArgs } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { destroySession, getSession, logoutUrl } from '~/auth.server';

export const action = async ({ request }: ActionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const logoutURL = new URL(logoutUrl);

	logoutURL.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID!);
	logoutURL.searchParams.set('returnTo', 'http://localhost:3000');

	return redirect(logoutURL.toString(), {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	});
};
