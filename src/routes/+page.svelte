<script lang="ts">
    import type { PageData } from './$types';
    import WeatherHelpers from '$lib/WeatherHelpers';
    import Button from '$lib/components/Button.svelte';
    export let data: PageData;
    const failure = data.failure;
</script>

<div class="lead">
    The weather outside is
</div>

<div class="perfection">
    {#if !failure && data.perfection}
        { data.isPerfect ? "Perfect" : "Not Perfect" }
    {:else}
        Unknown
    {/if}
</div>

<div class="conditions">
    {#if !failure && data.weather}
        <div class="condition">
            { WeatherHelpers.weatherDescription(data.weather.code) }
        </div>
        <div class="condition">
            { data.weather.temp } {data.perfection.metric ? "Cº" : "Fº"}
        </div>
        <div class="condition">
            { data.weather.windspeed } {data.perfection.metric ? "km/h" : "mph"} wind
        </div>
    {:else}
        <div class="condition">
            Failed to get weather.
        </div>
    {/if}
</div>

{#if !failure && data.placeName}
    <div class="location">
        {data.placeName}
    </div>
{/if}

<div class="buttons">
    <Button href="/location">Refine Location</Button>
    <Button href="/perfection">Define Perfection</Button>
</div>

<style lang="scss">
    .lead {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .perfection {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .conditions {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .condition {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .location {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: var(--element-spacing);
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: $element-spacing;
        width: 100%;
    }
</style>