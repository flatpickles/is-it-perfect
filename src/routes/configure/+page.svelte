<script lang="ts">
    import type { PageData, ActionData } from './$types';
    export let data: PageData;
    export let form: ActionData;

    const lat = form?.lat || data.coords.lat;
    const long = form?.long || data.coords.long;
</script>

<form method="POST" action="?/locate">
    <label>
        Freeform
        <input name="user_location" type="text">
    </label>
    <button>Locate</button>
</form>

<br />

<form method="POST" action="?/configure">
    <label>
        Latitude
        <input name="lat" type="text" value={lat}>
    </label>
    <label>
        Longitude
        <input name="long" type="text" value={long}>
    </label>
    <button>Check Perfection</button>
</form>