import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

import type { Project, Park, SimHENUA } from '../../../../lib/server/db/types';

const KEY_SIM_HENUA = 'SimHENUA';
let game: SimHENUA;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const park = await getParkFromDatabase(params.id);

    if (park) {
        return park;
    }

    error(404, 'Not found');
}

async function getParkFromDatabase(parkId: number) {
    console.log("Getting parkId=" + parkId);
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
        //console.log("SimHENUA=" + game);
        
        // Find park
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




