import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

import type { Park, Site, SiteType, SimHENUA } from '$lib/server/db/types';
import { KEY_SIM_HENUA, siteTypesArray } from '$lib/server/db/types';
import { SHHelper } from "$lib/server/helper.js";

let game: SimHENUA;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // Parse id into park and site id
    const parts = params.id.split("_");
    const parkId = parts[0];
    const siteId = parts[1];

    game = await Helper.loadGame();
    const site = await Helper.getSiteFromDatabase(game, parkId, siteId);

    if (site) {
        return {
            site: site,
            parkId: parkId,
            siteTypesArr: siteTypesArray
        };
    }

    error(404, 'Not found');
}

export const actions = {
    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId");
        const existingSiteId: number = data.get('existingSiteId');
        const newSiteId: string = <string>data.get('siteId');
        game = await Helper.loadGame();
        const park = await Helper.getParkFromDatabase(game, parkId);
        const site = await Helper.getSiteFromDatabase(game, parkId, existingSiteId);

        // Update site id.
        /*
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
        }*/
        
        // Update site type.
        const newSiteType: string = <string>data.get('siteType');
        if (newSiteType != site.siteType) {
            console.log('Changing site type to:' + newSiteType);
            site.siteType = newSiteType;
            try {
                await kv.set(KEY_SIM_HENUA, game);
            } catch (error) {
                // Handle errors
            }
        }
    }
}





