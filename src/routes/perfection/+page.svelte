<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import type { Perfection } from '$lib/types';
    import Config from '$lib/Config';
    import CookiesMessage from '$lib/components/CookiesMessage.svelte';

    export let data: PageData;

    const perfection: Perfection = data.perfection;

    function metricify() {
        if (perfection.metric) {
            perfection.tempLow = Math.round(((perfection.tempLow - 32) * 5) / 9);
            perfection.tempHigh = Math.round(((perfection.tempHigh - 32) * 5) / 9);
            perfection.maxWind = Math.round(perfection.maxWind * 1.609);
        } else {
            perfection.tempLow = Math.round((perfection.tempLow * 9) / 5 + 32);
            perfection.tempHigh = Math.round((perfection.tempHigh * 9) / 5 + 32);
            perfection.maxWind = Math.round(perfection.maxWind / 1.609);
        }
    }
</script>

<form method="POST" action="?/perfect">
    <label>
        Low Temperature: {perfection.tempLow}
        {perfection.metric ? 'Cº' : 'Fº'}
        <br />
        <input
            name={Config.tempLowName}
            type="range"
            bind:value={perfection.tempLow}
            min={perfection.metric ? '-18' : '0'}
            max={perfection.metric ? '38' : '100'}
        />
    </label>
    <br />
    <label>
        High Temperature: {perfection.tempHigh}
        {perfection.metric ? 'Cº' : 'Fº'}
        <br />
        <input
            name={Config.tempHighName}
            type="range"
            bind:value={perfection.tempHigh}
            min={perfection.metric ? '-18' : '0'}
            max={perfection.metric ? '38' : '100'}
        />
    </label>
    <br />
    <label>
        Max Wind: {perfection.maxWind}
        {perfection.metric ? 'km/h' : 'mph'}
        <br />
        <input
            name={Config.maxWindName}
            type="range"
            bind:value={perfection.maxWind}
            min="0"
            max={perfection.metric ? '64' : '40'}
        />
    </label>
    <br />
    <label>
        Cloud Tolerance: {perfection.clouds}
        <br />
        <input
            name={Config.cloudsName}
            type="range"
            bind:value={perfection.clouds}
            min="0"
            max="4"
        />
    </label>
    <br />
    <label>
        Precipitation Tolerance: {perfection.precipitation}
        <br />
        <input
            name={Config.precipitationName}
            type="range"
            bind:value={perfection.precipitation}
            min="0"
            max="4"
        />
    </label>
    <br />
    <label>
        <input
            name={Config.metricName}
            type="checkbox"
            bind:checked={perfection.metric}
            value="true"
            on:change={metricify}
        />
        Metric Units
    </label>
    <br />
    <br />
    <button>Perfect</button>
</form>

<CookiesMessage />
