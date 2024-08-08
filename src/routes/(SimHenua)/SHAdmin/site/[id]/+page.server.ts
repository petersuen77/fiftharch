import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

import type { Site, SiteType } from '$lib/server/db/types';
import { KEY_SIM_HENUA, siteTypesArray } from '$lib/server/db/types';
import { SHHelper } from "$lib/server/helper";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // Parse id into park and site id
    const parts = params.id.split("_");
    const parkId: number = parts[0] as unknown as number;
    const siteId: number = parts[1] as unknown as number;

    let site:Site | null = SHHelper.getSiteFromDB(parkId, siteId);

    if (site) {
        return {
            site: site,
            parkId: parkId,
            siteTypesArr: siteTypesArray
        };
    }

    return error(404, 'Site ' + siteId + ' not found');
}

export const actions = {
    updateSite: async ({ cookies, request }) => {
        // Update site    
        const data = await request.formData();
        const parkId: number = data.get("parkId") as unknown as number;
        const existingSiteId: number = data.get('existingSiteId') as unknown as number;
        const newSiteId: string = <string>data.get('siteId');
                
        // Update site type.
        const newSiteType: SiteType = <string>data.get('siteType') as unknown as SiteType;
        SHHelper.updateSite(parkId, null, existingSiteId, null, newSiteType);
    }
};





