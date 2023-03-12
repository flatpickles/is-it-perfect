<script lang="ts">
    import WeatherHelpers from '$lib/WeatherHelpers';
import type { PageData } from './$types';
    export let data: PageData;

    const failure = data.failure;
</script>


{#if !failure}
    <p>
        Temperature: { data.weather?.temp }º F
    </p>

    <p>
        { data.placeName }
    </p>
{:else}
    <p>
        Failed to get Weather
    </p>
{/if}

<a href="/configure">Configure location</a>