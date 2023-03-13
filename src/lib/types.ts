/**
 * Simple pair of lat/long geo coordinates, and whether they seem refined or not
 */
export interface Coords {
    lat: number,
    long: number,
    refined: boolean
}

// todo make these non-string values
export interface Weather {
    temp: string,
    windspeed: string,
    code: string
}

export interface Perfection {
    temp: number
}
