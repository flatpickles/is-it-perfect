import { GOOGLE_KEY } from '$env/static/private';
import type { Coords } from './types';

export default class LocationHelpers {
    /**
     * Return the distance in kilometers between two locations
     * @param loc1 - first location coordinates 
     * @param loc2 - second location coordinates
     * @returns - kilometers between the two locations
     */
    static geoDistance(lat1: number, long1: number, lat2: number, long2: number) {
        lat1 = lat1 * Math.PI/180;
        long1 = long1 * Math.PI/180;
        lat2 = lat2 * Math.PI/180;
        long2 = long2 * Math.PI/180;
        return Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
        ) * 6371.0;
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