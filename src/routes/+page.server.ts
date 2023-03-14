

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
            StateHelpers.placeName(coords),
            WeatherHelpers.currentWeather(coords, perfection.metric),
        ]);

        return {
            weather: weather,
            perfection: perfection,
            placeName: place,
            failure: false
        };
    } catch {
        return {
            failure: true
        }
    }
}) satisfies PageServerLoad;