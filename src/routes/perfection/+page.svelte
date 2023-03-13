<script lang="ts">
    import Cookies from '$lib/components/cookies.svelte';
    import type { Perfection } from '$lib/types';

    import type { PageData, ActionData } from './$types';
    export let data: PageData;
    // export let form: ActionData;

    const pefection: Perfection = data.perfection;
</script>

<p>
    Current perfect temp: { pefection.temp }° F
</p>

<Cookies />