<script lang="ts">
    import ButtonButton from '$lib/components/ButtonButton.svelte';
    import Cookies from '$lib/components/Cookies.svelte';
    import TextEntry from '$lib/components/TextEntry.svelte';
    import { defaultPerfection } from '$lib/types';

    import type { PageData, ActionData } from './$types';
    export let data: PageData;
    export let form: ActionData;

    const lat = form?.lat || data.coords.lat;
    const long = form?.long || data.coords.long;
</script>

<form class="locate-form" method="POST" action="?/locate">
    <TextEntry name="user_location" placeholder="Enter a zip code..." />
    <ButtonButton>Search</ButtonButton>
</form>

<form class="lat-long-form" method="POST" action="?/configure">
    <TextEntry name="lat" label="Latitude" value={lat} />
    <TextEntry name="long" label="Longitude" value={long} />
    <ButtonButton>Check Perfection</ButtonButton>
</form>

<Cookies />

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
