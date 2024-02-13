export const TYPING = "typing"
export const TYPE = "type"
export const TYPED = "typed"

export const ERASING = "erasing"
export const ERASE = "erase"
export const ERASED = "erased"

export const RESUMED_ANY = "resumed"
export const PAUSED_ANY = "paused"

/**
 * @deprecated Use `type` instead
 */
export const NEXT_CHAR = "typewritten-text:nextchar"
/**
 * @deprecated Will be removed
 */
export const nextCharEvent = (position: number) => new CustomEvent(NEXT_CHAR, {
	detail: { position },
})

/**
 * @deprecated Use `erase` instead
 */
export const PREV_CHAR = "typewritten-text:prevchar"
/**
 * @deprecated Will be removed
 */
export const prevCharEvent = (position: number) => new CustomEvent(PREV_CHAR, {
	detail: { position },
})

/**
 * @deprecated Use `typed` instead
 */
export const PHRASE_TYPED = "typewritten-text:phrasetyped"
/**
 * @deprecated Will be removed
 */
export const phraseTypedEvent = () => new CustomEvent(PHRASE_TYPED)

/**
 * @deprecated Use `erased` instead
 */
export const PHRASE_REMOVED = "typewritten-text:phraseremoved"
/**
 * @deprecated Will be removed
 */
export const phraseRemovedEvent = () => new CustomEvent(PHRASE_REMOVED)

/**
 * @deprecated Use `resumed`, `typing`, or `erasing` instead
 */
export const STARTED = "typewritten-text:started"
/**
 * @deprecated Will be removed
 */
export const startedEvent = () => new CustomEvent(STARTED)

/**
 * @deprecated Use `paused` instead
 */
export const PAUSED = "typewritten-text:paused"
/**
 * @deprecated Will be removed
 */
export const pausedEvent = () => new CustomEvent(PAUSED)