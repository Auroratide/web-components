<script>
    import { browser } from '$app/environment'
    import { html } from '../../../../components/example-component/README.md'

    if (browser)    
        import('@auroratide/example-component/lib/define.js')
</script>

<svelte:head>
    <title>The example-component Element</title>
</svelte:head>

<article>
    {@html html}
</article>
