<script lang="ts">
    export let name: string;
    export let placeholder: string | null = null;
    export let value: string | null = null;
    export let label: string | null = null;
</script>

<div class="entry-wrapper">
    {#if label}
        <label for={name}>{label}</label>
    {/if}
    <input type="text" {name} {placeholder} {value} />
</div>

<style lang="scss">
    input {
        width: 100%;
        height: 100%;
        padding: 0rem $element-spacing;
        border: 2px solid $foreground-color;
        color: $foreground-color;
        caret-color: $foreground-color;
    }

    $placeholder-color: rgba($foreground-color, 0.5);

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $placeholder-color;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: $placeholder-color;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: $placeholder-color;
    }

    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: $element-spacing;
        height: 100%;
        width: 10rem;

        @include secondary-text;
        background-color: $foreground-color;
        color: $background-color;
    }

    .entry-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        row-gap: $element-spacing;
        width: 100%;
        height: 100%;
    }
</style>
