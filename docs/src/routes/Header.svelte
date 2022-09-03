<header>
    <div class="container">
        <a class="site-title" href="/">Web Components</a>
        <address>By <a href="https://auroratide.com">Auroratide</a></address>
        <slot></slot>
    </div>
</header>

<style>
    header {
        background-color: var(--c-banner);
        color: var(--c-banner-text);
    }

    header :global(a) {
        color: var(--c-banner-text);
    }

    .site-title {
        font-size: var(--f-p1);
        text-decoration: none;
    }

    .site-title:hover, .site-title:focus {
        text-decoration: underline;
    }

    address {
        font-style: normal;
        font-size: var(--f-m1);
    }
</style>