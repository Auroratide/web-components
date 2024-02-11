<script>
    import { base, assets } from "$app/paths"
</script>

<header>
    <div class="container">
        <div class="site-nav">
            <div class="site-links">
                <a class="skip-link" href="#main">Skip to content</a>
                <a class="site-title" href="{base}">Web Components</a>
                <address>By <a href="https://auroratide.com">Auroratide</a></address>
            </div>
            <a class="site-logo" href="{base}" aria-hidden="true" tabindex="-1"><img src="{assets}/logo-256.png" alt="Web Components" /></a>
        </div>
        <hr />
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

    .site-nav {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .site-links {
        flex: 1;
    }

    .site-logo img {
        height: calc(var(--f-p1) + var(--f-m1));
    }

    hr {
        border: none;
        border-bottom: 1.5px solid var(--c-banner-text);
        margin: 0 1rem 1rem;
    }

    .skip-link {
        text-align: center;
        position: absolute;
        top: 1em;
        left: -9999px;
    }

    .skip-link:focus {
        left: clamp(16px, 2.667vw, 32px);
        z-index: 999;
    }

    .skip-link:focus::after {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: hsla(0, 0%, 0%, 0.75);
        z-index: -2;
    }

    @media screen and (min-width: 1200px) {
        .site-nav {
            flex-direction: column-reverse;
            text-align: center;
        }

        .site-logo img {
            height: var(--f-p3);
        }
    }
</style>