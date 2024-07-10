import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

import type { Site, SiteType, SimHENUA } from '../../../../lib/server/db/types';

const KEY_SIM_HENUA = 'SimHENUA';
let game: SimHENUA;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // Parse id into park and site id
    const parts = params.id.split("#");
    
    const site = await getSiteFromDatabase(params.id);

    if (site) {
        return site;
    }

    error(404, 'Not found');
}

async function getSiteFromDatabase(siteId: number) {
    console.log("Getting siteId=" + siteId);
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
        
        // Find site
        let i = 0;
        while (i < game.parks.length) {
            if (game.parks[i].id == parkId)
                return game.parks[i];
            i++;
        }
        return false;
    } catch (error) {
        // Handle errors
    }
}




