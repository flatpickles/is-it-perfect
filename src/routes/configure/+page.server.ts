import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
 
export const actions = {
    configure: async ({ cookies, request }) => {
        const data = await request.formData();
        const lat = data.get('lat');
        const long = data.get('long');
        if (lat) cookies.set('lat', lat as string, { path: '/' });
        if (long) cookies.set('long', long as string, { path: '/' });
        throw redirect(303, '/');
    },

    locate: async ({ request }) => {
        const data = await request.formData();
        const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
        url.searchParams.append('name', data.get('user_location') as string);
        const resultData = await fetch(url).then((response) => response.json());
        if (resultData['results'] && resultData['results'].length > 0) {
            return {
                lat: resultData['results'][0]['latitude'],
                long: resultData['results'][0]['longitude'],
            }
        } else {
            return fail(404);
        }
    }
} satisfies Actions;
