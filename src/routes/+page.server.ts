
import LocationHelpers from '$lib/LocationHelpers';
import StateHelpers from '../lib/StateHelpers';
import WeatherHelpers from '../lib/WeatherHelpers';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
    try {
        const [coords, perfection] = await Promise.all([
            StateHelpers.currentCoords(request),
            StateHelpers.currentPerfection(request),
        ]);
        const [place, weather] = await Promise.all([
            LocationHelpers.placeName(coords),
            WeatherHelpers.currentWeather(coords, perfection.metric),
        ]);

        return {
            weather: weather,
            perfection: perfection,
            isPerfect: WeatherHelpers.isPerfect(weather, perfection),
            placeName: place,
            failure: false
        };
    } catch (exception) {
        console.error(exception);
        return {
            failure: true
        }
    }
}) satisfies PageServerLoad;