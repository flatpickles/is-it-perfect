import { PUBLIC_DEV_ENV } from '$env/static/public'
import { GOOGLE_KEY } from '$env/static/private'
import type { LayoutServerLoad } from './$types';
 
// todo: data is available everywhere, but also fetch is done before every page load...

export const load = (async ({ cookies, getClientAddress }) => {
    let lat = cookies.get('lat');
    let long = cookies.get('long');
    const refined = cookies.get('refined') === 'true'; // todo

    // Get basic lat/long from IP if not set
    // todo – always get this, use it if we're far enough away from saved lat/long
    if (!lat || !long) {
        const requestingIP = (PUBLIC_DEV_ENV === 'true') ? '24.4.152.155' : getClientAddress();
        const ipLocUrl = new URL(`http://ip-api.com/json/${requestingIP}`);
        const ipReqData = await fetch(ipLocUrl).then((response) => response.json());
        lat = ipReqData['lat'];
        long = ipReqData['lon'];
    }

    // Get the forecast from the configured lat/long
    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    const weatherParams = {
        latitude: lat as string,
        longitude: long as string,
        current_weather: 'true',
        temperature_unit: 'fahrenheit',
    };
    Object.entries(weatherParams).map(([param, value]) => weatherUrl.searchParams.append(param, value));
    const weatherData = await fetch(weatherUrl).then((response) => response.json());

    // Get the name of the place
    const placeNameUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    const placeNameParams = {
        latlng: `${lat},${long}`,
        key: GOOGLE_KEY,
    };
    Object.entries(placeNameParams).map(([param, value]) => placeNameUrl.searchParams.append(param, value));
    const placeNameData = await fetch(placeNameUrl).then((response) => response.json());
    const neighborhoodData = placeNameData['results'].filter((result: Record<string, string>) => result['types'].includes('neighborhood'))[0];
    const neighborhoodName = neighborhoodData['address_components'][0]['long_name'];
    const cityName = neighborhoodData['address_components'][1]['long_name'];

    // Return
    return {
        lat: lat,
        long: long,
        weather: weatherData['current_weather'],
        refined: refined,
        neighborhoodName: neighborhoodName,
        cityName: cityName
    };
}) satisfies LayoutServerLoad;