<script lang="ts">
    import { onMount } from 'svelte';
    import ButtonButton from '$lib/components/ButtonButton.svelte';
    import CookiesMessage from '$lib/components/CookiesMessage.svelte';
    import Header from '$lib/components/Header.svelte';
    import TextEntry from '$lib/components/TextEntry.svelte';

    import type { PageData, ActionData } from './$types';
    export let data: PageData;
    export let form: ActionData;

    const lat = form?.lat || data.coords.lat;
    const long = form?.long || data.coords.long;

    let zipInput: TextEntry;
    onMount(() => {
        zipInput.focus();
    });
</script>

<svelte:head>
    <title>Refine Location</title>
</svelte:head>

<Header>Refine Location</Header>

<form class="locate-form" method="POST" action="?/locate">
    <TextEntry name="user_location" placeholder="Enter a zip code..." bind:this={zipInput} />
    <ButtonButton>Search</ButtonButton>
</form>

<form class="lat-long-form" method="POST" action="?/configure">
    <TextEntry name="lat" label="Latitude" value={lat} />
    <TextEntry name="long" label="Longitude" value={long} />
    <ButtonButton>Check Perfection</ButtonButton>
</form>

<CookiesMessage />

<style lang="scss">
    .locate-form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: $element-spacing;
        width: 100%;
        padding-bottom: $element-spacing;
    }

    .lat-long-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: $element-spacing;
        width: 100%;
    }
</style>
