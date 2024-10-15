import type { ThemeName } from "../design-system/Color"
import { IconName } from "../design-system/vector-icon/IconName"
import { base } from "$app/paths"

export const Routes = {
	Home: {
		href: () => `${base}/`,
	},
	Components: {
		ArchedText: {
			name: () => "Arched Text",
			href: () => `${base}/arched-text`,
		},
		FlipCard: {
			name: () => "Flip Card",
			href: () => `${base}/flip-card`,
		},
		ImgZoom: {
			name: () => "Img Zoom",
			href: () => `${base}/img-zoom`,
		},
		ReorderList: {
			name: () => "Reorder List",
			href: () => `${base}/reorder-list`,
		},
		TabList: {
			name: () => "Tab List",
			href: () => `${base}/tab-list`,
		},
		TableOfContents: {
			name: () => "Table of Contents",
			href: () => `${base}/table-of-contents`,
		},
		ToggleSwitch: {
			name: () => "Toggle Switch",
			href: () => `${base}/toggle-switch`,
		},
		TypewrittenText: {
			name: () => "Typewritten Text",
			href: () => `${base}/typewritten-text`,
		},
	},
} as const

export type SocialLink = {
	name: string,
	icon: IconName,
	color: ThemeName,
	href: string,
}

export const Socials = {
	LinkedIn: {
		name: "Linked In",
		icon: IconName.LinkedIn,
		color: "linked-in",
		href: "https://www.linkedin.com/in/timothy-foster-224946120",
	},
	Github: {
		name: "Github",
		icon: IconName.GithubAlt,
		color: "github",
		href: "https://github.com/Auroratide",
	},
	StackOverflow: {
		name: "Stack Overflow",
		icon: IconName.StackOverflow,
		color: "stack-overflow",
		href: "https://stackoverflow.com/users/6163066/auroratide",
	},
} satisfies Record<string, SocialLink>

export const MainNav = Object.values(Routes.Components).map((it) => ({
	href: it.href(),
	name: it.name(),
}))

export const FooterNav = [ {
	href: Routes.Home.href(),
	name: "All Components",
}, {
	href: "https://github.com/Auroratide/web-components",
	name: "Source Code",
}, {
	href: "https://auroratide.com",
	name: "My Website",
} ]
