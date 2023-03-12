/**
 * Simple pair of lat/long geo coordinates, and whether they seem refined or not
 */
export interface Coords {
    lat: number,
    long: number,
    refined: boolean
}

export interface Weather {
    temp: string,
    windspeed: string,
    code: string
}