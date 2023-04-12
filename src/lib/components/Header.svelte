<div class="header">
    <slot />
</div>

<style lang="scss">
    .header {
        width: 100%;
        margin-bottom: $element-spacing;
        padding: $element-spacing;

        font-family: 'Boska', serif;
        font-size: 2rem;
        text-align: center;

        color: $background-color;
        background-color: $foreground-color;
    }
</style>
