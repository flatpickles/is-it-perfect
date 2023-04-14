<div class="button">
    <slot />
</div>

<style lang="scss">
    .button {
        display: inline-block;
        padding: $element-spacing calc($element-spacing * 2);

        background-color: $foreground-color;
        color: $background-color;

        @include secondary-text;
        text-align: center;
        text-decoration: none;

        width: 100%;
    }
</style>
