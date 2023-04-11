import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_DEV_ENV } from '$env/static/public';
import { type Coords, type Perfection, defaultPerfection } from './types';

import Config from '$lib/Config';

export default class StateHelpers {
    static async currentCoords(request: RequestEvent): Promise<Coords> {
        const storedLatStr: string | undefined = request.cookies.get(Config.latName);
        const storedLat: number | null = storedLatStr ? parseFloat(storedLatStr) : null;
        const storedLongStr: string | undefined = request.cookies.get(Config.longName);
        const storedLong: number | null = storedLongStr ? parseFloat(storedLongStr) : null;

        // Get the current IP address
        const requestingIP =
            PUBLIC_DEV_ENV === 'true' ? '24.4.152.155' : request.getClientAddress();
        const ipLocUrl = new URL(`http://ip-api.com/json/${requestingIP}`);
        const ipReqData = await fetch(ipLocUrl).then((response) => response.json());
        const ipLatStr: string | undefined = ipReqData['lat'];
        const ipLat: number | null = ipLatStr ? parseFloat(ipLatStr) : null;
        const ipLongStr: string | undefined = ipReqData['lon'];
        const ipLong: number | null = ipLongStr ? parseFloat(ipLongStr) : null;

        // Calculate the return values
        const returnLat = storedLat || ipLat;
        const returnLong = storedLong || ipLong;
        if (!returnLat || !returnLong)
            throw new Error('Cannot get location from cookies or IP address');
        return {
            lat: returnLat,
            long: returnLong
        };
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
        if (storedMetricStr) storedPerfection.metric = storedMetricStr === 'true';
        return {
            ...defaultPerfection,
            ...storedPerfection
        };
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
    }
}
