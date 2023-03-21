<script lang="ts">
    import '../app.scss';
    import 'ress';
</script>

<div class="wrapper">
    <section class="content">
        <slot />
    </section>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: $background-color;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: $max-width;
        min-height: $min-height;
        padding: $element-spacing 0rem;

        color: $foreground-color;
    }
</style>
