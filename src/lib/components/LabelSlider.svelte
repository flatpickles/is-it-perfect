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
    // I lifted a lot of this from https://www.w3schools.com/howto/howto_js_rangeslider.asp

    $slider-height: 1.5rem;

    label {
        width: 100%;
    }

    @media (max-width: $max-width) {
        label {
            padding: 0 $element-spacing;
        }
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

    .slider:hover {
        background: rgba($foreground-color, 0.5);
    }

    .slider::-webkit-slider-thumb {
        box-shadow: none;
        appearance: none;
        width: $slider-height;
        height: $slider-height;
        background: $foreground-color;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        box-shadow: none;
        width: $slider-height;
        height: $slider-height;
        background: $foreground-color;
        cursor: pointer;
    }
</style>
