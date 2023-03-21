<script>
    import Button from "./Button.svelte";

</script>
<button>
    <Button>
        <slot />
    </Button>
</button>

<style lang="scss">
    button {
        width: 100%;
        flex-shrink: 5;
    }
</style>