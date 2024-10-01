<script>
	import "./style.css"
	import { browser } from "$app/environment"
	import { FooterNav, MainNav, Socials } from "$lib/web-components/routes"
	import { SiteInfo } from "$lib/design-system/SiteInfo"
	import { SocialLinks } from "$lib/design-system/SocialLinks"
	import { PageLayout } from "$lib/design-system/PageLayout"
	import { Logo } from "$lib/web-components/Logo"
	import { TableOfContents } from "$lib/design-system/TableOfContents"
	import { page } from "$app/stores"

	if (browser) {
		import("$lib/wc-demo")
		import("@auroratide/table-of-contents/lib/define.js")

		import("$lib/design-system/icon-divider/define")
		import("$lib/design-system/major-point/define")
		import("$lib/design-system/navigation-ripple/define")
		import("$lib/design-system/point-compilation/define")
		import("$lib/design-system/slide-show/define")
		import("$lib/design-system/vector-icon/define")
	}

	SiteInfo.set({
		title: "Web Components",
		subtitle: "By Auroratide",
		logo: {
			url: "",
			alt: "Auroratide's Web Components Logo",
		},
		url: "https://components.auroratide.com",
		author: {
			name: "Auroratide, Timothy Foster",
			url: "https://auroratide.com",
		},
	})
</script>

<PageLayout headerNav={MainNav} footerNav={FooterNav}>
	<Logo slot="logo" />
	<div slot="header">
		{#key $page.url.pathname}
			<TableOfContents contentId="page-content" />
		{/key}
	</div>
	<slot></slot>
	<SocialLinks slot="footer" title="Find me on" values={Object.values(Socials)} />
</PageLayout>
