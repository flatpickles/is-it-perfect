<script lang="ts">
    import type { PageData } from './$types';
    import WeatherHelpers from '$lib/WeatherHelpers';
    import ButtonLink from '$lib/components/ButtonLink.svelte';
    export let data: PageData;
    const failure = data.failure;
</script>

<svelte:head>
    <title>Is It Perfect?</title>
</svelte:head>

<div class="lead">The weather outside is</div>

<div class="perfection">
    {#if !failure && data.perfection}
        {data.isPerfect ? 'PERFECT' : 'NOT PERFECT'}
    {:else}
        UNKNOWN
    {/if}
</div>

<div class="conditions">
    {#if !failure && data.weather}
        <div class="condition">
            {WeatherHelpers.weatherDescription(data.weather.code)}
        </div>
        <div class="condition">
            {`${data.weather.temp}º ${data.perfection.metric ? 'C' : 'F'}`}
        </div>
        <div class="condition">
            {`${data.weather.windspeed} ${data.perfection.metric ? 'km/h' : 'mph'} wind`}
        </div>
    {:else}
        <div class="condition">Failed to get weather.</div>
    {/if}
</div>

<div class="spacer" />

{#if !failure && data.placeName}
    <div class="location">
        {data.placeName}
    </div>
{/if}

<div class="buttons">
    <ButtonLink href="/location">Refine Location</ButtonLink>
    <ButtonLink href="/perfection">Define Perfection</ButtonLink>
</div>

<style lang="scss">
    .lead {
        font-family: 'Rosaline', cursive;
        font-size: 1.8rem;
        text-align: center;
        padding: $element-spacing $element-spacing 0;
    }

    .perfection {
        width: 100%;
        margin-bottom: $element-spacing * 2;
        padding: $element-spacing;

        font-family: 'Boska', serif;
        font-size: 4rem;
        line-height: 4rem;
        text-align: center;

        color: $background-color;
        background-color: $foreground-color;
    }

    .conditions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .condition {
        @include primary-text;
        margin-bottom: $element-spacing;
    }

    .spacer {
        flex-grow: 1;
    }

    .location {
        @include secondary-text;
        margin-bottom: $element-spacing * 2;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: $element-spacing;
        width: 100%;
    }
</style>
