<script>
    import { browser } from '$app/environment'
    import { html } from '../../../../components/tab-list/README.md'

    if (browser)    
        import('@auroratide/tab-list/lib/define.js')
</script>

<svelte:head>
    <title>The tab-list Element</title>
</svelte:head>

<article>
    {@html html}
</article>
