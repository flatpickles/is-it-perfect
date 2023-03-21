<script lang="ts">
    import 'ress';
    import '../styles.css';
</script>


<div class="wrapper">
    <section class="content">
        <slot />
    </section>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: aquamarine;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 500px;
        padding: var(--element-spacing) 0rem;

        background-color: white;
    }
</style>