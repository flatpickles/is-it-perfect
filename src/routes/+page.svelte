<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    const weather = data.weather;
    console.log(weather);
</script>

Temperature: {weather.temperature}º F

<a href="/configure">Configure location</a>