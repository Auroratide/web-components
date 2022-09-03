<script>
    import Header from './Header.svelte'
    import Nav from './Nav.svelte'
    import { highlight } from '$lib/syntax-highlighter'
    import { afterUpdate } from 'svelte'

    let highlightKey = Symbol()

    afterUpdate(() => {
        highlightKey = Symbol()
    })
</script>

<div class="full-screen horizontal-on-large">
    <Header>
        <Nav />
    </Header>
    <main class="container" use:highlight={highlightKey}>
        <slot></slot>
    </main>
</div>

<style>
    :root {
        --c-bg: hsl(0, 0%, 87%);
        --c-banner: hsl(215, 100%, 10%);
        --c-banner-text: hsl(0, 0%, 100%);
        --c-content: hsl(0, 0%, 100%);
        --c-content-text: hsl(0, 0%, 16%);
        --c-primary: hsl(210, 68%, 45%);
        --c-secondary: hsl(262, 58%, 58%);
        --c-code-bg: hsl(0, 0%, 93%);
        --c-primary-overlay: hsl(207, 52%, 97%);
        --c-success: hsl(102, 46%, 36%);
        --c-success-overlay: hsl(100, 43%, 96%);
        --c-danger: hsl(357, 68%, 45%);
        --c-danger-overlay: hsl(359, 52%, 96%);
        --c-warning: hsl(48, 86%, 29%);
        --c-warning-overlay: hsl(50, 63%, 96%);

        --c-code-default: var(--content-text);
        --c-code-comment: #008800;
        --c-code-keyword: #0060FF;
        --c-code-literal: #a85f30;
        --c-code-name: #0080AA;
        --c-code-string:  #a31515;
        --c-code-annotation:  #808000;

        --f-m1: clamp(0.85rem, 1.333vw, 1rem);
        --f-0: clamp(1rem, 1.667vw, 1.25rem);
        --f-p1: clamp(1.25rem, 2vw, 1.5rem);
        --f-p2: clamp(1.5rem, 2.667vw, 2rem);
    }

    :global(*, *::before, *::after) {
        box-sizing: border-box;
        margin-top: 0;
    }

    :global(body) {
        background-color: var(--c-bg);
        padding: 0;
        margin: 0;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: var(--f-0);
    }

    :global(.container) {
        padding: clamp(16px, 2.667vw, 32px);
    }

    :global(main) {
        background-color: var(--c-content);
        color: var(--c-content-text);
    }

    :global(a) {
        color: var(--c-primary);
        text-decoration: underline;
    }

    :global(a:hover, a:focus) {
        text-decoration: none;
    }

    :global(a:visited) {
        color: var(--c-secondary);
    }

    .full-screen {
        min-height: 100vh;
    }

    .horizontal-on-large {
        display: flex;
        flex-direction: column;
    }

    .horizontal-on-large main {
        flex: 1;
    }

    @media screen and (min-width: 1200px) {
        .horizontal-on-large {
            flex-direction: row;
            max-width: 1200px;
            margin: auto;
        }
    }

    /* Code
    ========================================================================== */
    :global(code) {
        font-family: 'Source Code Pro', monospace;
        font-size: var(--f-0);
        color: var(--c-content-text);
        background: var(--c-code-bg);
        border-radius: 0.25em;
        padding: 0.0625em 0.25em;
    }

    :global(pre) {
        margin-bottom: 1.5em;
    }

    :global(pre code) {
        font-size: 90%;
        display: block;
        line-height: 1.5em;
        border: 1px solid var(--c-primary);
        border-left-width: 6px;
        padding: 0 16px;
        overflow: auto;
        background: none;
        background-image: linear-gradient(transparent 50%, var(--c-primary-overlay) 50%);
        background-size: 3em 3em;
        border-radius: 0;
    }

    :global(.success > pre code) {
        border-color: var(--c-success);
        background-image: linear-gradient(transparent 50%, var(--c-success-overlay) 50%);
    }

    :global(.warning > pre code) {
        border-color: var(--c-warning);
        background-image: linear-gradient(transparent 50%, var(--c-warning-overlay) 50%);
    }

    :global(.danger > pre code) {
        border-color: var(--c-danger-banner);
        background-image: linear-gradient(transparent 50%, var(--c-danger-overlay) 50%);
    }

    :global(code .comment) {
        color: var(--c-code-comment);
    }

    :global(code .keyword),
    :global(code .attr-name),
    :global(code .rule),
    :global(code .property) {
        color: var(--c-code-keyword);
    }

    :global(code .number),
    :global(code .boolean) {
        color: var(--c-code-literal);
    }

    :global(code .string),
    :global(code .regex),
    :global(code .attr-value) {
        color: var(--c-code-string);
    }

    :global(code .class-name),
    :global(code .selector),
    :global(code .tag > .tag) {
        color: var(--c-code-name);
    }

    :global(code .function),
    :global(code .pseudo-class) {
        font-weight: 700;
    }

    :global(code .doctype) {
        color: var(--c-code-annotation);
    }

    :global(code .tag > .punctuation) {
        color: var(--c-code-default);
    }
</style>