/**
 * Simple pair of lat/long geo coordinates
 */
export interface Coords {
    lat: number;
    long: number;
}

// todo make these non-string values
export interface Weather {
    temp: number;
    windspeed: number;
    code: number;
}

export interface Perfection {
    tempLow: number;
    tempHigh: number;
    maxWind: number;
    clouds: number;
    precipitation: number;
    metric: boolean;
}

export const defaultPerfection: Perfection = {
    tempLow: 66,
    tempHigh: 74,
    maxWind: 5,
    clouds: 1,
    precipitation: 0,
    metric: false
};
