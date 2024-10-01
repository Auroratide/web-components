import { getContext, setContext } from "svelte"

const key = Symbol()

export type SiteInfo = {
	title: string,
	subtitle: string,
	logo: {
		url: string,
		alt: string,
	},
	url: string,
	author: {
		name: string,
		url: string,
	},
}

export const SiteInfo = {
	set: (value: SiteInfo) => setContext(key, value),
	get: () => getContext<SiteInfo>(key),
}
