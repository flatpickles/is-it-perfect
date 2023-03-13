import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_DEV_ENV } from '$env/static/public';
import { GOOGLE_KEY } from '$env/static/private';
import type { Coords, Perfection } from './types';

// Todo: move elsewhere?
const config = {
    latCookieName: 'lat',
    longCookieName: 'long',
    refinedCookieName: 'refined',
    refinedLimit: 20 // location is "refined" within this number of km
}

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

const defaultPerfection: Perfection = {
    temp: 68
};

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
        let refined = (request.cookies.get(config.refinedCookieName) === 'true');
        if (storedLat && storedLong && ipLat && ipLong) {
            const distance = geoDistance(storedLat, storedLong, ipLat, ipLong);
            if (distance > config.refinedLimit) refined = false;
        }

        // Return relevant config (promise)
        return {
            lat: storedLat || ipLat,
            long: storedLong || ipLong,
            refined: refined,
        }
    }

    static currentPerfection(request: RequestEvent): Perfection {
        const storedPerfectTempStr = request.cookies.get('temp');
        const storedPerfectTemp = storedPerfectTempStr ? parseFloat(storedPerfectTempStr) : null;
        return {
            temp: storedPerfectTemp ?? defaultPerfection.temp
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
}