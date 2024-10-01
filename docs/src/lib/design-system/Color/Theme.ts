export type StandardThemeName = "blue" | "purple" | "yellow" | "green" | "red"
export type BrandThemeName = "github" | "linked-in" | "stack-overflow"
export type ThemeName = StandardThemeName | BrandThemeName

export const Theme = (name: ThemeName) => `theme-${name}`
