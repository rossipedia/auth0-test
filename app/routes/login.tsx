import type { ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/auth.server';
import { Button } from '~/components/Button';

export let action = ({ request }: ActionArgs) => {
	return authenticator.authenticate('auth0', request, {
		successRedirect: 'http://localhost:3000',
	});
};

export default function Login() {
	return (
		<Form method="post">
			<Button>Login with Auth0</Button>
		</Form>
	);
}
