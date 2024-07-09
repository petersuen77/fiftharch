import { kv } from '@vercel/kv'

import { fail } from '@sveltejs/kit';

import type { Project, Park, SimHENUA } from '../../../lib/server/db/types';

const KEY_SIM_HENUA = 'SimHENUA';
let game: SimHENUA;

export const load = async (event) => {
    const session = await event.locals.getSession();
    try {
        game = await kv.get(KEY_SIM_HENUA);
        if (!game) {
            game = { parks: [] }
            try {
                await kv.set(KEY_SIM_HENUA, game);
            } catch (error) {
                // Handle errors
            }
        }
        console.log("SimHENUA=" + game);
        return {
            game: game
        };
    } catch (error) {
        // Handle errors
    }
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
        console.log('Add New Park: name= ' + parkName);
        if (!parkNameExists(parkName)) {
            // Set park id as array index+1
            let parkId = game.parks.length + 1;
            game.parks.push({ id: parkId, name: parkName })
            try {
                await kv.set(KEY_SIM_HENUA, game);
            } catch (error) {
                // Handle errors
            }
        } else return fail(422, { parkName: parkName, error: 'Park name already exists' });
    },

    updatePark: async ({ cookies, request }) => {
        // Update park    
        const data = await request.formData();
        const newParkName: string = <string>data.get('parkName');
        const parkId: number = <number>data.get('parkId');
        console.log('Update Park: id= ' + parkId + ', new name=' + newParkName);
        let i = 0;
        while (i < game.parks.length) {
            if (game.parks[i].id == parkId) {
                game.parks[i].name = newParkName;
                try {
                    await kv.set(KEY_SIM_HENUA, game);
                } catch (error) {
                    // Handle errors
                }
                return;
            }
            i++;
        }
    },

    deletePark: async ({ cookies, request }) => {
        // Delete park 
        const data = await request.formData();
        const parkId: number = <number>data.get('parkId');
        console.log('Delete Park: id= ' + parkId);
        deletePark(parkId);
        try {
            await kv.set(KEY_SIM_HENUA, game);
        } catch (error) {
            // Handle errors
        }
    }
};

function parkNameExists(parkName: string) {
    let i = 0;
    while (i < game.parks.length) {
        if (game.parks[i].name == parkName)
            return true;
        i++;
    }
    return false;
}

function updateParkIds() {
    let i = 0;
    while (i < game.parks.length) {
        game.parks[i].id = i + 1;
        i++;
    }
}

function deletePark(parkId:number) {
    let i = 0;
    while (i < game.parks.length) {
        if (game.parks[i].id == parkId) {
            game.parks.splice(i, 1);
            updateParkIds();
            return true;
        }
        i++;
    }
    return false;
}



