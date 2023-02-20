import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react';
import stylesheet from '~/tailwind.css';
import { authenticator } from './auth.server';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
	const auth = await authenticator.isAuthenticated(request);
	return json({ auth });
}

export default function App() {
	const { auth } = useLoaderData<typeof loader>();
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="p-3 font-sans">
				<Outlet />
				<pre className="mt-4 p-2 text-xs text-gray-800 bg-gray-100 border rounded">
					{JSON.stringify({ auth }, null, 2)}
				</pre>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
