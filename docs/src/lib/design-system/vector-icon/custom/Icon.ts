export type Icon = {
	iconName: string,
	icon: [
		number, // width
		number, // height
		string[], // ligatures
		string, // unicode
		string // svgPathData
	],
	offset?: [ number, number ],
}
