<script>
    import { browser } from '$app/environment'
    import { html } from '../../../../components/toggle-switch/README.md'

    if (browser)    
        import('@auroratide-wc/toggle-switch/lib/define.js')
</script>

<svelte:head>
    <title>The toggle-switch Element</title>
</svelte:head>

{@html html}
