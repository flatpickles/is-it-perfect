<script lang="ts">
    export let displayName: string;
    export let formName: string;
    export let checked: boolean;
</script>

<label>
    <input name={formName} type="checkbox" bind:checked value="true" on:change />
    {displayName}
</label>

<style>
    label {
        width: 100%;
    }
</style>
