import { kv } from '@vercel/kv'
import { fail, error } from '@sveltejs/kit';

import type { SiteType } from '$lib/server/db/types';
import { game, SHHelper } from "$lib/server/helper";
import { siteTypesArray } from '$lib/server/db/types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let parkId: number = params.id;
    return SHHelper.getParkFromDB(parkId);
    error(404, 'Park Not found');
}

export const actions = {
    /*
    default: async ({ cookies, request }) => {
        // Default action
    },*/

    addSite: async ({ cookies, request }) => {
        // Add a new site
        const data = await request.formData();
        const parkId: number = data.get("addParkId");
        const siteZone: string = <string>data.get('addSiteZone');
        const siteId: number = data.get("addSiteId");

        const siteType: SiteType = siteTypesArray[0];
        const siteState: number = 1;

        SHHelper.addNewSite(parkId, siteZone, siteId, siteType, siteState);
    },

    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId");
        const existingSiteId: string = <string>data.get('existingSiteId');
        const newSiteId: string = <string>data.get('siteId');
        game = await Helper.loadGame();
        const park = await Helper.getParkFromDatabase(game, parkId);

        // Update site id.
        if (existingSiteId != newSiteId) {
            if (!siteExists(park, newSiteId)) {
                const site = getSite(park, existingSiteId);
                site.id = newSiteId;
                try {
                    await kv.set(KEY_SIM_HENUA, game);
                } catch (error) {
                    // Handle errors
                }
            } else return fail(422, { siteId: existingSiteId, error: 'Site ID already exists' });
        }

        // Update zone id.
        const siteZone: string = <string>data.get('siteZone');
        const site = getSite(park, existingSiteId);
        site.zone = siteZone;
        try {
            await kv.set(KEY_SIM_HENUA, game);
        } catch (error) {
            // Handle errors
        }
    },

    deleteSite: async ({ cookies, request }) => {
        // Delete site.
        const data = await request.formData();
        const parkId: number = data.get("parkId");
        const existingSiteId: string = <string>data.get('existingSiteId');
        game = await Helper.loadGame();
        const park = await Helper.getParkFromDatabase(game, parkId);
        deleteSite(park, existingSiteId);
        try {
            await kv.set(KEY_SIM_HENUA, game);
        } catch (error) {
            // Handle errors
        }
    }
}

function getSite(park: Park, siteId: number) {
    let i = 0;
    while (i < park.sites.length) {
        if (park.sites[i].id == siteId)
            return park.sites[i];
        i++;
    }
    return;
}

function deleteSite(park: Park, siteId: number) {
    let i = 0;
    while (i < park.sites.length) {
        if (park.sites[i].id == siteId) {
            park.sites.splice(i, 1);
            return true;
        }
        i++;
    }
    return false;
}




