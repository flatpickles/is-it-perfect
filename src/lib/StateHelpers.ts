import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_DEV_ENV } from '$env/static/public';
import { GOOGLE_KEY } from '$env/static/private';
import type { Coords } from './types';

const config = {
    latCookieName: 'lat',
    longCookieName: 'long',
    refinedLimit: 10 // location is "refined" within this number of km
}

/**
 * Return the distance in kilometers between two locations
 * @param loc1 - first location coordinates 
 * @param loc2 - second location coordinates
 * @returns - kilometers between the two locations
 */
function geoDistance(lat1: number, long1: number, lat2: number, long2: number) {
    return Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
    ) * 6371.0;
}

export default class StateHelpers {
    static async currentCoords(request: RequestEvent): Promise<Coords> {
        const storedLatStr: string | undefined = request.cookies.get(config.latCookieName);
        const storedLat: number | null = storedLatStr ? parseFloat(storedLatStr) : null;
        const storedLongStr: string | undefined = request.cookies.get(config.longCookieName);
        const storedLong: number | null = storedLongStr ? parseFloat(storedLongStr) : null;

        // Get the current IP address
        const requestingIP = (PUBLIC_DEV_ENV === 'true') ? '24.4.152.155' : request.getClientAddress();
        const ipLocUrl = new URL(`http://ip-api.com/json/${requestingIP}`);
        const ipReqData = await fetch(ipLocUrl).then((response) => response.json());
        const ipLatStr: string | undefined = ipReqData['lat'];
        const ipLat: number | null = ipLatStr ? parseFloat(ipLatStr) : null;
        const ipLongStr: string | undefined = ipReqData['lon'];
        const ipLong: number | null = ipLongStr ? parseFloat(ipLongStr) : null;
        if (!ipLat || !ipLong) throw new Error('Cannot locate IP address');

        // Calculate distances, if relevant
        let refined = false;
        if (storedLat && storedLong && ipLat && ipLong) {
            const distance = geoDistance(storedLat, storedLong, ipLat, ipLong);
            if (distance < config.refinedLimit) refined = true;
        }

        // Return relevant config (promise)
        return {
            lat: storedLat || ipLat,
            long: storedLong || ipLong,
            refined: refined,
        }
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
        
            const refinedName = componentsMap['neighborhood'] ??
                componentsMap['sublocality'] ??
                componentsMap['locality'] ??
                componentsMap['administrative_area_level_2'] ??
                componentsMap['administrative_area_level_1'] ??
                componentsMap['country'];
            const generalName = componentsMap['administrative_area_level_2'] ??
                componentsMap['administrative_area_level_1'] ??
                componentsMap['country'];

            // Return the right thing, depending on refinement
            return currentCoords.refined ? refinedName : generalName;
        } catch {
            throw new Error('Cannot parse place name from coordinates.')
        }
    }
}