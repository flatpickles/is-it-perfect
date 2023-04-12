<script lang="ts">
    export let displayName: string;
    export let formName: string;
    export let checked: boolean;
</script>

<label class="container">
    <span class="label-text">{displayName}</span>
    <div>
        <input name={formName} type="checkbox" bind:checked value="true" on:change />
        <span class="checkmark" />
    </div>
</label>

<style lang="scss">
    // I lifted a lot of this from https://www.w3schools.com/howto/howto_css_custom_checkbox.asp

    $checkbox-width: 1.5rem;

    .label-text {
        line-height: 1;
    }

    .container {
        width: 100%;
        height: $checkbox-width;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding-left: calc($checkbox-width + $element-spacing);
        cursor: pointer;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: $checkbox-width;
        width: $checkbox-width;
        background-color: rgba($foreground-color, 0.7);
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: $foreground-color;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: $foreground-color;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: '';
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: calc($checkbox-width / 2.7);
        top: calc($checkbox-width / 5);
        width: calc($checkbox-width / 4);
        height: calc($checkbox-width / 2);
        border: solid $background-color;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
</style>
