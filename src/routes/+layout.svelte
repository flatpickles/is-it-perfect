<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.scss';
    import 'ress';

    function updateVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    onMount(() => {
        updateVH();
        window.addEventListener('resize', updateVH);
    });
</script>

<div class="wrapper">
    <section class="content">
        <slot />
    </section>
</div>

<style lang="scss">
    .wrapper {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
