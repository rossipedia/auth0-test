import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authenticator } from '~/auth.server';
import { Link } from '~/components/Link';

export async function loader({ request }: LoaderArgs) {
	const auth = await authenticator.isAuthenticated(request);
	return json({ auth });
}

export default function Index() {
	const { auth } = useLoaderData<typeof loader>();
	return (
		<div className="flex flex-col gap-3">
			<h1>Home Page</h1>
			<hr />
			{auth ? (
				`Welcome ${auth.email}`
			) : (
				<Link to="/login" className="text-blue-500 underline">
					Log In
				</Link>
			)}
		</div>
	);
}
