import type { Coords, Weather } from './types';

export default class WeatherHelpers {
    static async currentWeather(coords: Coords, metric: boolean): Promise<Weather> {
        // Get the forecast from the configured lat/long
        const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
        const weatherParams = {
            latitude:  coords.lat.toString(),
            longitude: coords.long.toString(),
            current_weather: 'true',
            temperature_unit: metric ? 'celsius' :'fahrenheit',
            timeformat: 'unixtime'
        };
        Object.entries(weatherParams).map(([param, value]) => weatherUrl.searchParams.append(param, value));
        const weatherData = await fetch(weatherUrl).then((response) => response.json());
        try {
            // Collect weather details
            const currentWeather = weatherData['current_weather'];
            return {
                temp: currentWeather['temperature'],
                windspeed: currentWeather['windspeed'],
                code: currentWeather['weathercode'],
            };
        } catch {
            throw new Error('Cannot find weather for provided coords.');
        }
    }
}
