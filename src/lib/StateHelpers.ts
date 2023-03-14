import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_DEV_ENV } from '$env/static/public';
import { GOOGLE_KEY } from '$env/static/private';
import { type Coords, type Perfection, defaultPerfection } from './types';

import Config from '$lib/Config';

/**
 * Return the distance in kilometers between two locations
 * @param loc1 - first location coordinates 
 * @param loc2 - second location coordinates
 * @returns - kilometers between the two locations
 */
function geoDistance(lat1: number, long1: number, lat2: number, long2: number) {
    lat1 = lat1 * Math.PI/180;
    long1 = long1 * Math.PI/180;
    lat2 = lat2 * Math.PI/180;
    long2 = long2 * Math.PI/180;
    return Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
    ) * 6371.0;
}

export default class StateHelpers {
    static async currentCoords(request: RequestEvent): Promise<Coords> {
        const storedLatStr: string | undefined = request.cookies.get(Config.latName);
        const storedLat: number | null = storedLatStr ? parseFloat(storedLatStr) : null;
        const storedLongStr: string | undefined = request.cookies.get(Config.longName);
        const storedLong: number | null = storedLongStr ? parseFloat(storedLongStr) : null;

        // Get the current IP address
        const requestingIP = (PUBLIC_DEV_ENV === 'true') ? '24.4.152.155' : request.getClientAddress();
        const ipLocUrl = new URL(`http://ip-api.com/json/${requestingIP}`);
        const ipReqData = await fetch(ipLocUrl).then((response) => response.json());
        const ipLatStr: string | undefined = ipReqData['lat'];
        const ipLat: number | null = ipLatStr ? parseFloat(ipLatStr) : null;
        const ipLongStr: string | undefined = ipReqData['lon'];
        const ipLong: number | null = ipLongStr ? parseFloat(ipLongStr) : null;
        
        // Calculate distances, if relevant
        let refined = (request.cookies.get(Config.refinedName) === 'true');
        if (storedLat && storedLong && ipLat && ipLong) {
            const distance = geoDistance(storedLat, storedLong, ipLat, ipLong);
            if (distance > Config.refinedLimit) refined = false;
        }
        
        // Calculate the return values
        const returnLat = storedLat || ipLat;
        const returnLong = storedLong || ipLong;
        if (!returnLat || !returnLong) throw new Error('Cannot get location from cookies or IP address');
        return {
            lat: returnLat,
            long: returnLong,
            refined: refined,
        }
    }

    static currentPerfection(request: RequestEvent): Perfection {
        // It'd be nice to do this iteratively, but that's hard in a type-safe way... 
        const storedTempLowStr = request.cookies.get(Config.tempLowName);
        const storedTempHighStr = request.cookies.get(Config.tempHighName);
        const storedMaxWindStr = request.cookies.get(Config.maxWindName);
        const storedCloudsStr = request.cookies.get(Config.cloudsName);
        const storedPrecipStr = request.cookies.get(Config.precipitationName);
        const storedMetricStr = request.cookies.get(Config.metricName);
        const storedPerfection: Partial<Perfection> = {};
        if (storedTempLowStr) storedPerfection.tempLow = parseFloat(storedTempLowStr);
        if (storedTempHighStr) storedPerfection.tempHigh = parseFloat(storedTempHighStr);
        if (storedMaxWindStr) storedPerfection.maxWind = parseFloat(storedMaxWindStr);
        if (storedCloudsStr) storedPerfection.clouds = parseFloat(storedCloudsStr);
        if (storedPrecipStr) storedPerfection.precipitation = parseFloat(storedPrecipStr);
        if (storedMetricStr) storedPerfection.metric = (storedMetricStr === 'true');
        return {
            ...defaultPerfection,
            ...storedPerfection
        };
    }

    static async placeName(currentCoords: Coords): Promise<string> {
        // Request the place names
        const placeNameUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json');
        const placeNameParams = {
            latlng: `${currentCoords.lat},${currentCoords.long}`,
            key: GOOGLE_KEY
        };
        Object.entries(placeNameParams).map(([param, value]) => placeNameUrl.searchParams.append(param, value));
        const placeNameData = await fetch(placeNameUrl).then((response) => response.json());
        
        // Parse place names
        try {
            const components = placeNameData['results'][0]['address_components'];
            const componentsMap = components.reduce((acc: Record<string, string>, component: Record<string, string>) => {
                const typeName = component['types'][0];
                const longName = component['long_name'];
                acc[typeName] = longName;
                return acc;
            }, {});
        
            const generalName = componentsMap['sublocality'] ??
                componentsMap['locality'] ??
                componentsMap['administrative_area_level_2'] ??
                componentsMap['administrative_area_level_1'] ??
                componentsMap['country'];
            const refinedName = componentsMap['neighborhood'] ?? generalName;

            // Return the right thing, depending on refinement
            return currentCoords.refined ? refinedName : generalName;
        } catch {
            throw new Error('Cannot parse place name from coordinates.')
        }
    }

    static async setPerfection(requestEvent: RequestEvent) {
        const data = await requestEvent.request.formData();
        Object.keys(defaultPerfection).forEach((key) => {
            requestEvent.cookies.set(key, data.get(key) as string, { path: '/' });
        });
    }

    static async setLocation(requestEvent: RequestEvent) {
        const data = await requestEvent.request.formData();
        [Config.latName, Config.longName].forEach((key) => {
            requestEvent.cookies.set(key, data.get(key) as string, { path: '/' });
        });
        requestEvent.cookies.set(Config.refinedName, 'true', { path: '/' });
    }
}
