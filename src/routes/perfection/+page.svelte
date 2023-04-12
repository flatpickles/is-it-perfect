<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import type { Perfection } from '$lib/types';
    import Config from '$lib/Config';
    import CookiesMessage from '$lib/components/CookiesMessage.svelte';
    import ButtonButton from '$lib/components/ButtonButton.svelte';
    import LabelSlider from '$lib/components/LabelSlider.svelte';
    import LabelCheckbox from '$lib/components/LabelCheckbox.svelte';

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
    <LabelSlider
        displayName="Low Temperature"
        formName={Config.tempLowName}
        unit={perfection.metric ? 'Cº' : 'Fº'}
        bind:value={perfection.tempLow}
        minValue={perfection.metric ? -18 : 0}
        maxValue={perfection.metric ? 38 : 100}
    />
    <LabelSlider
        displayName="High Temperature"
        formName={Config.tempHighName}
        unit={perfection.metric ? 'Cº' : 'Fº'}
        bind:value={perfection.tempHigh}
        minValue={perfection.metric ? -18 : 0}
        maxValue={perfection.metric ? 38 : 100}
    />
    <LabelSlider
        displayName="Max Wind"
        formName={Config.maxWindName}
        unit={perfection.metric ? 'km/h' : 'mph'}
        bind:value={perfection.maxWind}
        minValue={0}
        maxValue={perfection.metric ? 64 : 40}
    />
    <LabelSlider
        displayName="Cloud Tolerance"
        formName={Config.cloudsName}
        unit=""
        bind:value={perfection.clouds}
        minValue={0}
        maxValue={4}
    />
    <LabelSlider
        displayName="Precipitation Tolerance"
        formName={Config.precipitationName}
        unit=""
        bind:value={perfection.precipitation}
        minValue={0}
        maxValue={4}
    />
    <LabelCheckbox
        displayName="Metric Units"
        formName={Config.metricName}
        bind:checked={perfection.metric}
        on:change={metricify}
    />
    <br />
    <ButtonButton>Check Perfection</ButtonButton>
</form>

<CookiesMessage />
