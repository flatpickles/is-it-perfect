import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
 
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const lat = data.get('lat');
        const long = data.get('long');
        if (lat) cookies.set('lat', lat as string, { path: '/' });
        if (long) cookies.set('long', long as string, { path: '/' });
        throw redirect(303, '/');
    }
} satisfies Actions;
