import { PUBLIC_DEV_ENV } from '$env/static/public'
import type { LayoutServerLoad } from './$types';
 
// todo: data is available everywhere, but also fetch is done before every page load...

export const load = (async ({ cookies, getClientAddress }) => {
    let lat = cookies.get('lat');
    let long = cookies.get('long');

    // Get basic lat/long from IP if not set
    if (!lat || !long) {
        const requestingIP = (PUBLIC_DEV_ENV === 'true') ? '24.4.152.155' : getClientAddress();
        const ipLocUrl = new URL(`http://ip-api.com/json/${requestingIP}`);
        const ipReqData = await fetch(ipLocUrl).then((response) => response.json());
        lat = ipReqData['lat'];
        long = ipReqData['lon'];
        console.log(ipReqData);
    }

    // Get the forecast from the configured lat/long
    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    const weatherParams = {
        latitude: lat as string,
        longitude: long as string,
        current_weather: 'true',
        temperature_unit: 'fahrenheit'
    };
    Object.entries(weatherParams).map(([param, value]) => weatherUrl.searchParams.append(param, value));
    const weatherData = await fetch(weatherUrl).then((response) => response.json());

    // Return
    return {
        lat: lat,
        long: long,
        weather: weatherData['current_weather']
    };
}) satisfies LayoutServerLoad;