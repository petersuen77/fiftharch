import { kv } from '@vercel/kv'
import { error, fail } from '@sveltejs/kit';
import type { Park, Site, SiteType, SiteState, SimHENUA } from '$lib/server/db/types';
import { KEY_SIM_HENUA, siteTypesArray, siteStatesArray } from '$lib/server/db/types';

export let game: SimHENUA | null;

export class SHHelper {

    constructor() {
        console.log("Creating SHHelper");
    }

    static async loadGame() {
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
        return game;
    }

    static async saveGame() {
        try {
            await kv.set(KEY_SIM_HENUA, game);
        } catch (error) {
            // Handle errors
        }
    }

    // *******************************
    // PARK FUNCTIONS
    // *******************************

    static addNewPark(parkName: string) {
        console.log('Add New Park: name= ' + parkName);
        if (!game) throw new Error("SimHENUA game not initialized");
        if (!this.parkNameExists(parkName)) {
            // Set park id as array index+1
            let parkId = game.parks.length + 1;
            game.parks.push({ id: parkId, name: parkName, sites: [] })
            this.saveGame();
            return true;
        } else return fail(422, { parkName: parkName, error: '   * Park name already exists' });
    }

    static updatePark(parkId: number, newParkName: string) {
        console.log('Update Park: id= ' + parkId + ', new name=' + newParkName);
        if (!game) throw new Error("SimHENUA game not initialized");
        let park: Park | null = this.getParkFromDB(parkId);
        if (park) {
            park.name = newParkName;
            this.saveGame();
            console.log('   * Saved');
        } else return fail(422, { parkId: parkId, error: '   * Park id ' + parkId + ' not found' });
    }

    static deletePark(parkId: number) {
        console.log("Delete parkId " + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");
        let i = 0;
        while (i < game.parks.length) {
            if (game.parks[i].id == parkId) {
                game.parks.splice(i, 1);
                this.updateParkIds();
                return true;
            }
            i++;
        }
        return fail(422, { parkId: parkId, error: '   * Park id ' + parkId + ' not found' });
    }

    static parkNameExists(parkName: string) {
        if (!game) throw new Error("SimHENUA game not initialized");
        let i = 0;
        while (i < game.parks.length) {
            if (game.parks[i].name == parkName) {
                console.log("parkName " + parkName + " exists=true");
                return true;
            }
            i++;
        }
        console.log("parkName " + parkName + " exists=false");
        return false;
    }

    static updateParkIds() {
        console.log("Updating park ids");
        if (!game) throw new Error("SimHENUA game not initialized");
        let i = 0;
        while (i < game.parks.length) {
            game.parks[i].id = i + 1;
            i++;
        }
        this.saveGame();
    }

    static getParkFromDB(parkId: number): Park | null {
        console.log("Getting parkId=" + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");
        try {
            // Find park
            let i = 0;
            while (i < game.parks.length) {
                if (game.parks[i].id == parkId) {
                    // Double check park has sites array.
                    if (!game.parks[i].sites) {
                        game.parks[i].sites = [];
                        this.saveGame();
                    }
                    return game.parks[i];
                }
                i++;
            }

        } catch (error) {
            // Handle errors
        }
        return null;
    }

    // *******************************
    // SITE FUNCTIONS
    // *******************************

    static addNewSite(parkId: number, siteZone: string, siteId: number, siteType: SiteType, siteState: SiteState) {
        console.log('Add new site ' + siteZone + '-' + siteId + ' to park ' + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");
        let park: Park | null = this.getParkFromDB(parkId);
        if (!park) throw new Error("ParkId " + parkId + " not found");
        if (!this.siteExists(park, siteId)) {
            park.sites.push({ zone: siteZone, id: siteId, siteType: siteType, state: siteState });
            this.saveGame();
            return;
        } else return fail(422, { addSiteId: siteId, error: 'Site ID already exists' });
    }

    static async updateSite(parkId: number, newSiteZone: string | null, existingSiteId: number | null, newSiteId: number | null, newSiteType: SiteType | null, 
        newSiteState: SiteState | null) {
        
        console.log('Update site ' + existingSiteId + '-' + existingSiteId + ' for park ' + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");

        let park:Park | null = this.getParkFromDB(parkId);
        if (!park) return fail(422, { parkId: parkId, error: 'parkId ' + parkId + ' not found' });
        
        let site: Site | null = this.getSiteFromDB(parkId, existingSiteId);
        if (!site) return fail(422, { existingSiteId: existingSiteId, error: 'existingSiteId ' + existingSiteId + ' not found' });

        // Update site id.
        if (newSiteId && (existingSiteId != newSiteId)) {
            if (!this.siteExists(park, newSiteId)) {
                site.id = newSiteId;
            } else return fail(422, { siteId: existingSiteId, error: 'Site ID already exists' });
        }

        // Update zone
        if (newSiteZone && (newSiteZone != site.zone)) site.zone = newSiteZone;

        // Update type
        if (newSiteType && (newSiteType != site.siteType)) site.siteType = newSiteType;

        // Update state
        if (newSiteState && (newSiteState != site.state)) site.state = newSiteState;

        // Save
        await this.saveGame();
    }

    static getSiteFromDB(parkId: number, siteId: number): Site | null {
        console.log("Getting siteId=" + siteId + " from parkId=" + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");
        try {
            // Find park
            let park = SHHelper.getParkFromDB(parkId);
            if (!park) return null;

            // Find site
            let i = 0;
            while (i < park.sites.length) {
                if (park.sites[i].id == siteId)
                    return park.sites[i];
                i++;
            }
        } catch (error) {
            // Handle errors
        }
        return null;
    }

    static siteExists(park: Park, siteId: number) {
        let i = 0;
        while (i < park.sites.length) {
            if (park.sites[i].id == siteId)
                return true;
            i++;
        }
        return false;
    }

    static deleteSite(parkId: number, siteId: number) {
        console.log("Delete site " + siteId + " from parkId=" + parkId);
        if (!game) throw new Error("SimHENUA game not initialized");

        let park: Park | null = this.getParkFromDB(parkId);
        if (!park) return fail(422, { parkId: parkId, error: 'parkId ' + parkId + ' not found' });

        let i = 0;
        while (i < park.sites.length) {
            if (park.sites[i].id == siteId) {
                park.sites.splice(i, 1);
                this.saveGame();
                return true;
            }
            i++;
        }
        return false;
    }
}