<script>
    import { browser } from '$app/environment'
    import { html } from '../../../README.md'

    if (browser) {
        import('@auroratide/tab-list/lib/define')
        import('@auroratide/toggle-switch/lib/define')
    }
</script>

<svelte:head>
    <title>Web Components by Auroratide</title>
</svelte:head>

<article>
    {@html html}
</article>
