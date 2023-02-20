import { Link as RouterLink } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';

export function Link(props: LinkProps) {
	return <RouterLink className="text-blue-500 hover:underline" {...props} />;
}
