<script>
    import { browser } from '$app/environment'
    import Header from './Header.svelte'
    import Nav from './Nav.svelte'

    if (browser)
        import('$lib/wc-demo')
</script>

<div class="full-screen horizontal-on-large">
    <Header>
        <Nav />
    </Header>
    <main id="main" class="container">
        <slot></slot>
    </main>
</div>

<style>
    :root {
        --c-bg: hsl(0, 0%, 87%);
        --c-bg-border: hsl(0, 0%, 75%);
        --c-banner: hsl(215, 100%, 10%);
        --c-banner-text: hsl(0, 0%, 100%);
        --c-content: hsl(0, 0%, 100%);
        --c-content-text: hsl(0, 0%, 16%);
        --c-content-off: hsl(0, 0%, 97%);
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
        --f-p3: clamp(1.825rem, 3.667vw, 2.75rem);
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
        position: relative;
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
        overflow: hidden;
    }

    @media screen and (min-width: 1200px) {
        .horizontal-on-large {
            flex-direction: row;
            max-width: 1200px;
            margin: auto;
        }
    }

    :global(wc-demo) {
        display: block;
        border: 0.0625em solid var(--c-primary);
        border-radius: 0.25em;
        padding: 0.75em;
        box-shadow: 0.125em 0.125em 0.25em hsla(0, 0%, 0%, 0.15) inset;
        background: var(--c-content-off);
        margin-bottom: 1.5rem;
    }

    :global(wc-demo > *:last-child) {
        margin-bottom: 0;
    }

    /* Code
     * ===================================================================== */
    :global(code) {
        font-family: 'Source Code Pro', monospace;
        font-size: var(--f-m1);
        color: var(--c-content-text);
        background: var(--c-code-bg);
        border-radius: 0.25em;
        padding: 0.0625em 0.25em;
    }

    :global(pre) {
        margin-bottom: 1.5em;
    }

    :global(pre code) {
        font-size: 80%;
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

    :global(code .hljs-comment) {
        color: var(--c-code-comment);
    }

    :global(code .hljs-keyword),
    :global(code .hljs-attr),
    :global(code .hljs-attribute) {
        color: var(--c-code-keyword);
    }

    :global(code .hljs-number),
    :global(code .hljs-literal) {
        color: var(--c-code-literal);
    }

    :global(code .hljs-string),
    :global(code .hljs-regexp) {
        color: var(--c-code-string);
    }

    :global(code .hljs-name),
    :global(code .hljs-title.class_),
    :global(code .hljs-selector-class) {
        color: var(--c-code-name);
    }

    :global(code .hljs-built_in),
    :global(code .hljs-title.function_),
    :global(code .hljs-selector-pseudo) {
        font-weight: 700;
    }

    :global(code .hljs-meta) {
        color: var(--c-code-annotation);
    }

    :global(kbd) {
        font-family: 'Source Code Pro', monospace;
        font-size: var(--f-m1);
        color: var(--c-code-default);
        border: 0.0625em solid var(--c-bg);
        border-bottom-width: 0.125em;
        border-radius: 0.25em;
        padding: 0.0625em 0.25em;
    }

    /* Articles
     * ===================================================================== */
    :global(article) {
        padding: 0;
        margin: 0;
    }

    :global(article p) {
        line-height: 1.5em;
        margin-bottom: 1.5rem;
    }

    :global(article li),
    :global(article li) {
        line-height: 1.5em;
    }

    :global(ul, ol) {
        margin-bottom: 1.5rem;
    }

    :global(article h1),
    :global(article h2),
    :global(article h3),
    :global(article h4),
    :global(article h5),
    :global(article h6) {
        font-weight: 700;
        line-height: 1;
        padding-top: 1.5rem;
        margin-bottom: 1rem;
    }

    :global(article h1) { padding: 0; }
    :global(article h2) { border-bottom: 1px solid var(--c-bg); }

    :global(article h1) { font-size: var(--f-p3); }
    :global(article h2) { font-size: var(--f-p2); }
    :global(article h3) { font-size: var(--f-p1); }
    :global(article h4) { font-size: var(--f-0); }
    :global(article h5) { font-size: var(--f-0); }
    :global(article h6) { font-size: var(--f-0); }

    /* Tables
     * ===================================================================== */
    :global(table) {
        border-collapse: collapse;
        margin-bottom: 1.5rem;
    }

    :global(table td, table th) {
        border: 1px solid var(--c-bg-border);
        padding: 0.25rem 1rem;
    }
</style>