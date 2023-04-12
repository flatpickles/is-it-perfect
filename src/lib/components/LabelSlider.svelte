<script lang="ts">
    export let displayName: string;
    export let formName: string;
    export let unit: string;
    export let value: number;
    export let minValue: number;
    export let maxValue: number;
</script>

<div class="slider-wrapper">
    <label for={formName}>
        {displayName}:
        {value}
        {unit}
    </label>
    <input
        class="slider"
        id={formName}
        name={formName}
        type="range"
        bind:value
        min={minValue}
        max={maxValue}
    />
</div>

<style lang="scss">
    $slider-height: 1.5rem;

    label {
        width: 100%;
    }

    .slider-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: calc($element-spacing / 4);
    }

    .slider {
        appearance: none;
        width: 100%;
        height: $slider-height;
        background: rgba($foreground-color, 0.4);
        outline: none;
    }

    .slider::-webkit-slider-thumb {
        appearance: none;
        width: $slider-height;
        height: $slider-height;
        background: $foreground-color;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: $slider-height;
        height: $slider-height;
        background: $foreground-color;
        cursor: pointer;
    }
</style>
