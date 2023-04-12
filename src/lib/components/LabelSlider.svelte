<script lang="ts">
    export let displayName: string;
    export let formName: string;
    export let unit: string;
    export let value: number;
    export let minValue: number;
    export let maxValue: number;
</script>

<label>
    {displayName}
    {value}
    {unit}
    <br />
    <input name={formName} type="range" bind:value min={minValue} max={maxValue} />
</label>

<br />
