<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<form method="POST">
    <label>
        Latitude
        <input name="lat" type="text" value={data.lat}>
    </label>
    <label>
        Longitude
        <input name="long" type="text" value={data.long}>
    </label>
    <button>Check Perfection</button>
</form>