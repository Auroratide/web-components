<script>
    import Header from './Header.svelte'
    import Nav from './Nav.svelte'
</script>

<div class="full-screen horizontal-on-large">
    <Header>
        <Nav />
    </Header>
    <main class="container">
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

    :global(code) {
        font-family: 'Source Code Pro', monospace;
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
</style>