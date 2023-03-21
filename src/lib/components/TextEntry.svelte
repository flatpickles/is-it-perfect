<script lang="ts">
    export let name: string;
    export let placeholder: string;
</script>

<input {name} type="text" {placeholder} />

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
</style>
