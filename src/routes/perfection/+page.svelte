<script lang="ts">
    import Cookies from '$lib/components/cookies.svelte';
    import type { Perfection } from '$lib/types';

    import type { PageData, ActionData } from './$types';
    export let data: PageData;
    // export let form: ActionData;


    const perfection: Perfection = data.perfection;
</script>

<form method="POST" action="?/perfect">
    <label>
        Low Temperature: {perfection.tempLow}
        <br />
        <input name="tempLow" type="range" bind:value={perfection.tempLow}>
    </label>
    <br />
    <label>
        High Temperature: {perfection.tempHigh}
        <br />
        <input name="tempHigh" type="range" bind:value={perfection.tempHigh}>
    </label>
    <br />
    <label>
        Max Wind: {perfection.maxWind}
        <br />
        <input name="maxWind" type="range" bind:value={perfection.maxWind}>
    </label>
    <br />
    <button>Perfect</button>
</form>

<Cookies />
