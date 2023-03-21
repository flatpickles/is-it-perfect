<div class="button">
    <slot />
</div>

<style lang="scss">
    .button {
        display: inline-block;
        padding: 0.5rem 1rem;

        background-color: $foreground-color;
        color: $background-color;
        
        @include secondary-text;
        text-align: center;
        text-decoration: none;

        width: 100%;
    }
</style>