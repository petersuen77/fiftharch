import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { SHHelper } from "$lib/server/helper";
import type { Park } from '$lib/server/db/types';

export async function GET({ params }) {
    let parkId: number = params["parkId"] as unknown as number;
    try {
        let park: Park | null = await SHHelper.getParkFromDB(parkId);
        return json(park);
    } catch {
        error(404, 'Park Not found');
    }
}