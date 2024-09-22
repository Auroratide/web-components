export type AnimationDescription = {
	keyframes: Keyframe[] | PropertyIndexedKeyframes,
	options?: Omit<KeyframeAnimationOptions, "direction" | "fill">,
}

export type AnimationConfig = {
	duration?: number
}

export type Animator = (from: HTMLImageElement, dest: HTMLImageElement) => AnimationDescription | AnimationDescription[]

const EASE_OUT_CUBIC = "cubic-bezier(0.33, 1, 0.68, 1)"

export function pop({
	duration = 400,
}: AnimationConfig = {}): Animator {
	return (from, dest) => {
		const relativeTransform = getRelativeTransform(dest, from)
		return [{
			keyframes: [ {
				transform: `scale(${relativeTransform.scale})`,
			}, {
				transform: "scale(1)",
			} ],
			options: {
				duration,
				easing: "ease-out",
			},
		}, {
			keyframes: [ {
				transform: `translate(${relativeTransform.tx}px, ${relativeTransform.ty}px)`,
			}, {
				transform: "translate(0px, 0px)",
			} ],
			options: {
				duration,
				easing: EASE_OUT_CUBIC,
			},
		}]
	}
}

export function fade({
	duration = 400,
}: AnimationConfig = {}): Animator {
	return () => [{
		keyframes: [ {
			opacity: 0,
		}, {
			opacity: 1,
		} ],
		options: {
			duration,
		},
	}]
}

function getContainedSize(el: HTMLImageElement): [number, number] {
	const ratio = el.naturalWidth / el.naturalHeight
	let width = el.clientHeight * ratio
	let height = el.clientHeight

	if (width > el.clientWidth) {
		width = el.clientWidth
		height = el.clientWidth / ratio
	}

	return [width, height]
}

function getCenter(el: HTMLElement): [number, number] {
	const rect = el.getBoundingClientRect()
	return [rect.left + rect.width / 2, rect.top + rect.height / 2]
}

function getRelativeTransform(from: HTMLElement, dest: HTMLElement): {
	scale: number,
	tx: number,
	ty: number,
} {
	const f = from instanceof HTMLImageElement ? from : from.querySelector("img")
	const d = dest instanceof HTMLImageElement ? dest : dest.querySelector("img")

	if (f == null || d == null) {
		return {
			scale: 1,
			tx: 0,
			ty: 0,
		}
	}

	const [fw] = getContainedSize(f)
	const [dw] = getContainedSize(d)

	const [fx, fy] = getCenter(f)
	const [dx, dy] = getCenter(d)

	const r = dw / fw
	const tx = (dx - fx) / r
	const ty = (dy - fy) / r

	return {
		scale: r,
		tx: tx,
		ty: ty,
	}
}