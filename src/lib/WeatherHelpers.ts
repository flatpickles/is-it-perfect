import type { Coords, Perfection, Weather } from './types';

export default class WeatherHelpers {
    static async currentWeather(coords: Coords, metric: boolean): Promise<Weather> {
        // Get the forecast from the configured lat/long
        const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
        const weatherParams = {
            latitude:  coords.lat.toString(),
            longitude: coords.long.toString(),
            current_weather: 'true',
            temperature_unit: metric ? 'celsius' :'fahrenheit',
            windspeed_unit: metric ? 'kmh' : 'mph',
            timeformat: 'unixtime'
        };
        Object.entries(weatherParams).map(([param, value]) => weatherUrl.searchParams.append(param, value));
        const weatherData = await fetch(weatherUrl).then((response) => response.json());
        try {
            // Collect weather details
            const currentWeather = weatherData['current_weather'];
            return {
                temp: parseFloat(currentWeather['temperature']),
                windspeed: parseFloat(currentWeather['windspeed']),
                code: parseFloat(currentWeather['weathercode']),
            };
        } catch {
            throw new Error('Cannot find weather for provided coords.');
        }
    }

    static isPerfect(weather: Weather, perfection: Perfection): boolean {
        // Check if the weather is perfect
        if (weather.temp < perfection.tempLow) return false;
        if (weather.temp > perfection.tempHigh) return false;
        if (weather.windspeed > perfection.maxWind) return false;
        // todo: clouds, precipitation, etc
        return true;
    }

    static weatherDescription(weatherCode: number): string {
        const weatherDescriptions: Record<number, string> = {
            0: 'Clear Sky',
            1: 'Mostly Clear',
            2: 'Partly Cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Foggy',
            51: 'Light Drizzle',
            53: 'Moderate Drizzle',
            55: 'Dense Drizzle',
            56: 'Freezing Drizzle',
            57: 'Freezing Drizzle',
            61: 'Light Rain',
            63: 'Moderate Rain',
            65: 'Heavy Rain',
            71: 'Light Snow',
            73: 'Moderate Snow',
            75: 'Heavy Snow',
            77: 'Snow Grains',
            80: 'Light Rain Showers',
            81: 'Moderate Rain Showers',
            82: 'Heavy Rain Showers',
            85: 'Light Snow Showers',
            86: 'Heavy Snow Showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm',
            99: 'Thunderstorm',
        };
        return weatherDescriptions[weatherCode] ?? 'Unknown Weather';
    }
}
