const variants = (name: string, color: string) => ({
	a: `${name}-${color}-a`,
	b: `${name}-${color}-b`,
})

const colors = (name: string) => ({
	blue: variants(name, "blue"),
	purple: variants(name, "purple"),
	yellow: variants(name, "yellow"),
	green: variants(name, "green"),
	red: variants(name, "red"),
	bg: variants(name, "bg"),
	fg: variants(name, "fg"),
	primary: variants(name, "primary"),
})

export const Color = {
	var: colors("--t"),
	text: colors("text"),
	bg: colors("bg"),
	border: colors("border"),
} as const

export const PrimaryColors = ["blue", "purple", "yellow", "green", "red"] as const
