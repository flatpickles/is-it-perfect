<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    const weather = data.weather;
</script>

<p>
    Temperature: { weather.temperature }º F
</p>

<p>
    { data.neighborhoodName }
</p>

<p>
    { data.cityName }
</p>


<a href="/configure">Configure location</a>