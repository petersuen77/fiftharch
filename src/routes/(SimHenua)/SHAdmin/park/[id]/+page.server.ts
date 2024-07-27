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
        if (!park.sites) park.sites = [];
        return park;
    }

    error(404, 'Not found');
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
        const park = await getParkFromDatabase(parkId);
        console.log('Add new site ' + siteZone + '-' + siteId + ' to park ' + parkId);

        if (!park.sites) park.sites = [];
        if (!siteExists(park, siteId)) {
            park.sites.push({ zone: siteZone, id: siteId });
            try {
                await kv.set(KEY_SIM_HENUA, game);
            } catch (error) {
                // Handle errors
            }
            return;
        } else return fail(422, { addSiteId: siteId, error: 'Site ID already exists' });
    },

    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId");
        const existingSiteId: string = <string>data.get('existingSiteId');
        const newSiteId: string = <string>data.get('siteId');
        const park = await getParkFromDatabase(parkId);

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
        const park = await getParkFromDatabase(parkId);
        deleteSite(park, existingSiteId);
        try {
            await kv.set(KEY_SIM_HENUA, game);
        } catch (error) {
            // Handle errors
        }
    }
};

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

function siteExists(park: Park, siteId: number) {
    let i = 0;
    while (i < park.sites.length) {
        if (park.sites[i].id == siteId)
            return true;
        i++;
    }
    return false;
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




