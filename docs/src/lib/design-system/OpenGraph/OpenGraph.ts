export type OpenGraph = OpenGraphBase & OpenGraphOptional & (OpenGraphWebsiteType | OpenGraphArticleType)

export type OpenGraphBase = {
	title: string,
	type: OpenGraphType,
	image: OpenGraphImage,
	url: string,
}

export type OpenGraphOptional = {
	site_name?: string,
	description?: string,
}

export type OpenGraphImage = {
	url: string,
	alt: string,
}

export type OpenGraphType = "website" | "article"

export type OpenGraphWebsiteType = {
	type: "website",
}

export type OpenGraphArticleType = {
	type: "article",
	article: OpenGraphArticle,
}

export type OpenGraphArticle = {
	published_time?: Date,
	section: string,
	author: string,
	tags: string[],
}
