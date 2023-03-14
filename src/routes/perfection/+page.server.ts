import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import StateHelpers from '$lib/StateHelpers';
import type { PageServerLoad } from '../$types';
 
export const load = (async (request) => {
    return {
        perfection: StateHelpers.currentPerfection(request)
    }
}) satisfies PageServerLoad;

export const actions = {
    perfect: async (request) => {
        await StateHelpers.setPerfection(request);
        throw redirect(303, '/');
    },
} satisfies Actions;