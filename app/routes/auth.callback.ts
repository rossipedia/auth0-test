import type { LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/auth.server';

export async function loader({ request }: LoaderArgs) {
	return await authenticator.authenticate('auth0', request, {
		successRedirect: '/',
	});
}
