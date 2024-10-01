import type { ThemeName } from "../Color"
import type { IconName } from "../vector-icon"

export type SocialLink = {
	name: string,
	href: string,
	icon: IconName,
	color: ThemeName,
}
