import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import StateHelpers from '$lib/StateHelpers';
import type { PageServerLoad } from '../$types';
 
export const load = (async (requestEvent) => {
    return {
        perfection: StateHelpers.currentPerfection(requestEvent)
    }
}) satisfies PageServerLoad;

export const actions = {
    perfect: async (requestEvent) => {
        await StateHelpers.setPerfection(requestEvent);
        throw redirect(303, '/');
    },
} satisfies Actions;