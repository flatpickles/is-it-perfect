

import StateHelpers from '../lib/StateHelpers';
import WeatherHelpers from '../lib/WeatherHelpers';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
    try {
        const coords = await StateHelpers.currentCoords(request);
        const [place, weather] = await Promise.all([
            StateHelpers.placeName(coords),
            WeatherHelpers.currentWeather(coords),
        ]);

        return {
            weather: weather,
            placeName: place,
            failure: false
        };
    } catch {
        return {
            failure: true
        }
    }
}) satisfies PageServerLoad;