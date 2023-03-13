import type { Actions } from './$types';
// import { redirect, fail } from '@sveltejs/kit';
import StateHelpers from '$lib/StateHelpers';
import type { PageServerLoad } from '../$types';
 
export const load = (async (request) => {
    return {
        perfection: StateHelpers.currentPerfection(request)
    }
}) satisfies PageServerLoad;

export const actions = {

} satisfies Actions;