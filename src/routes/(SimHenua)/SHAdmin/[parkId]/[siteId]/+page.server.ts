import { kv } from '@vercel/kv'

import { fail, error, redirect } from '@sveltejs/kit';

import type { Park, Site, SiteType, SiteState } from '$lib/server/db/types';
import { KEY_SIM_HENUA, siteTypesArray, siteStatesArray } from '$lib/server/db/types';
import { SHHelper, game } from "$lib/server/helper";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // Parse id into park and site id
    const parkId: number = params["parkId"] as unknown as number;
    const siteId: number = params["siteId"] as unknown as number;

    let park: Park | null = SHHelper.getParkFromDB(parkId);
    let site:Site | null = SHHelper.getSiteFromDB(parkId, siteId);

    if (site && park && game) {
        return {
            site: site,
            parkId: parkId,
            siteTypesArr: siteTypesArray,
            siteStatesArr: siteStatesArray,
            sites: park?.sites,
            parks: game.parks
        };
    }

    return error(404, 'Site ' + siteId + ' not found');
}

export const actions = {
    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId") as unknown as number;
        const newSiteZone: string = <string>data.get('siteZone');
        const existingSiteId: number = data.get('existingSiteId') as unknown as number;
        const newSiteId: number = data.get('siteId') as unknown as number;
        const newSiteType: SiteType = <string>data.get('siteType') as unknown as SiteType;
        const newSiteState: SiteState = <string>data.get('siteState') as unknown as SiteState;

        // Update site
        await SHHelper.updateSite(parkId, newSiteZone, existingSiteId, newSiteId, newSiteType, newSiteState);

        throw redirect(301, "/SHAdmin/" + parkId + "/" + newSiteId);
    }
};





