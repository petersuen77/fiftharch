import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

import type { Park, Site, SiteType, SimHENUA } from '../../../lib/server/db/types';
import type { siteTypesArray } from '../../../lib/server/db/index';


const KEY_SIM_HENUA = 'SimHENUA';
let game: SimHENUA;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // Parse id into park and site id
    const parts = params.id.split("_");
    const parkId = parts[0];
    const siteId = parts[1];
    const site = await getSiteFromDatabase(parkId, siteId);

    if (site) {
        return {
            site: site,
        };
    }

    error(404, 'Not found');
}

async function getSiteFromDatabase(parkId: number, siteId: number) {
    console.log("Getting siteId=" + siteId + " from parkId=" + parkId);
    try {
        // Load game
        game = await kv.get(KEY_SIM_HENUA);
        if (!game) {
            game = { parks: [] }
            try {
                await kv.set(KEY_SIM_HENUA, game);
            } catch (error) {
                // Handle errors
            }
        }
        
        // Find park
        let i = 0;
        let park = null;
        while (i < game.parks.length) {
            if (game.parks[i].id == parkId)
                park = game.parks[i];
            i = game.parks.length;
            i++;
        }
        if (!park) return;

        // Find site
        i = 0;
        while (i < park.sites.length) {
            if (park.sites[i].id == siteId)
                return park.sites[i];
            i++;
        }
        return null;
    } catch (error) {
        // Handle errors
    }
}






