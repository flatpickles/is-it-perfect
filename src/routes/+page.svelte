<script lang="ts">
    import type { PageData } from './$types';
    import WeatherHelpers from '$lib/WeatherHelpers';
    export let data: PageData;
    const failure = data.failure;
</script>


{#if !failure && data.weather && data.perfection}
    <p>
        <b>{ data.isPerfect ? "Perfect" : "Not Perfect" }</b>
    </p>

    <p>
        { WeatherHelpers.weatherDescription(data.weather.code) }
    </p>

    <p>
        Temperature: { data.weather.temp } {data.perfection.metric ? "Cº" : "Fº"}
    </p>

    <p>
        Wind: { data.weather.windspeed } {data.perfection.metric ? "km/h" : "mph"}
    </p>

    <p>
        { data.placeName }
    </p>
{:else}
    <p>
        Failed to get Weather
    </p>
{/if}

<p>
    <a href="/location">Refine Location</a>
</p>

<p>
    <a href="/perfection">Define Perfection</a>
</p>