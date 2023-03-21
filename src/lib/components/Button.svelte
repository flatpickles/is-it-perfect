<script lang="ts">
    export let href: string;
</script>

<a href={href}>
    <div class="button">
        <slot /> Bubba dubba dubba dubba
    </div>
</a>

<style>
    a {
        width: 100%;
    }

    .button {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #eee;
        color: #333;
        text-decoration: none;
        
        text-align: center;

        width: 100%;
    }
</style>