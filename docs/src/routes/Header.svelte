<script>
    import { base, assets } from '$app/paths'
</script>

<header>
    <div class="container">
        <div class="site-nav">
            <div class="site-links">
                <a class="site-title" href="{base}">Web Components</a>
                <address>By <a href="https://auroratide.com">Auroratide</a></address>
            </div>
            <a class="site-logo" href="{base}" aria-hidden="true"><img src="{assets}/logo-256.png" alt="Web Components" /></a>
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