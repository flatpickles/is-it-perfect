<script lang="ts">
    export let href: string;
</script>

<a href={href}>
    <div class="button">
        <slot />
    </div>
</a>

<style lang="scss">
    a {
        width: 100%;
    }

    .button {
        display: inline-block;
        padding: 0.5rem 1rem;

        background-color: $foreground-color;
        color: $background-color;
        
        @include primary-text;
        text-align: center;
        text-decoration: none;

        width: 100%;
    }
</style>