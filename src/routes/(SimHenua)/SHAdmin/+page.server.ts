import { kv } from '@vercel/kv'
import { fail } from '@sveltejs/kit';

import { game, SHHelper } from '$lib/server/helper';

export const load = async (event) => {
    return {
        game: game
    };
};

export const actions = {
    /*
    default: async ({ cookies, request }) => {
        // Default action
    },*/

    addPark: async ({ cookies, request }) => {
        // Add a new park
        const data = await request.formData();
        const parkName: string = <string>data.get('parkName');
        return SHHelper.addNewPark(parkName);
    },

    updatePark: async ({ cookies, request }) => {
        // Update park    
        const data = await request.formData();
        const newParkName: string = <string>data.get('parkName');
        const parkId: number = <number>data.get('parkId');
        return SHHelper.updatePark(parkId, newParkName);
    },

    deletePark: async ({ cookies, request }) => {
        // Delete park 
        const data = await request.formData();
        const parkId: number = <number>data.get('parkId');
        return SHHelper.deletePark(parkId);
    }
};





