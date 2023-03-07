import type { LayoutServerLoad } from './$types';
 
// todo: data is available everywhere, but also fetch is done before every page load...

export const load = (async ({ cookies }) => {
    const lat = cookies.get('lat');
    const long = cookies.get('long');

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    const params = {
        latitude: lat as string,
        longitude: long as string,
        current_weather: 'true',
        temperature_unit: 'fahrenheit'
    };
    Object.entries(params).map(([param, value]) => url.searchParams.append(param, value));

    const resultData = await fetch(url).then((response) => response.json())
    return {
        lat: lat,
        long: long,
        weather: resultData['current_weather']
    };
}) satisfies LayoutServerLoad;