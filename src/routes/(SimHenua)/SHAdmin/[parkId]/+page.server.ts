import { kv } from '@vercel/kv'
import { fail, error } from '@sveltejs/kit';

import type { SiteType, SiteState } from '$lib/server/db/types';
import { game, SHHelper } from "$lib/server/helper";
import { siteTypesArray, siteStatesArray } from '$lib/server/db/types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let parkId: number = params["parkId"] as unknown as number;
    try {
        return {
            park: SHHelper.getParkFromDB(parkId),
            parks: game?.parks
        }
    } catch {
        error(404, 'Park Not found');
    }
}

export const actions = {
    /*
    default: async ({ cookies, request }) => {
        // Default action
    },*/

    addSite: async ({ cookies, request }) => {
        // Add a new site
        const data = await request.formData();
        const parkId: number = data.get("addParkId") as unknown as number;
        const siteZone: string = <string>data.get('addSiteZone');
        const siteId: number = data.get("addSiteId") as unknown as number;

        const siteType: SiteType = siteTypesArray[0];
        const siteState: SiteState = siteStatesArray[1];

        return SHHelper.addNewSite(parkId, siteZone, siteId, siteType, siteState);
    },

    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId") as unknown as number;
        const existingSiteId: number = data.get('existingSiteId') as unknown as number;
        const newSiteId: number = data.get('siteId') as unknown as number;
        const newSiteZone: string = <string>data.get('siteZone');

        SHHelper.updateSite(parkId, newSiteZone, existingSiteId, newSiteId, null, null);
    },

    deleteSite: async ({ cookies, request }) => {
        // Delete site.
        const data = await request.formData();
        const parkId: number = data.get("parkId") as unknown as number;
        const existingSiteId: number = <string>data.get('existingSiteId') as unknown as number;;
        SHHelper.deleteSite(parkId, existingSiteId);
    }
}




