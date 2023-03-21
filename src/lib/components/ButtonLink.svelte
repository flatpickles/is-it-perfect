<script lang="ts">
    import Button from './Button.svelte';

    export let href: string;
</script>

<a href={href}>
    <Button>
        <slot />
    </Button>
</a>

<style lang="scss">
    a {
        width: 100%;
    }
</style>