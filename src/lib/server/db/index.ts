import { fail } from '@sveltejs/kit';

const KEY_PAGE_VISITS = 'pageVisits';
const KEY_PROJECT_NAMES_BY_USER_EMAIL = 'project-names:by-user-email:#';

import { KV_REST_API_TOKEN, KV_REST_API_URL } from '$env/static/private'
import { createClient } from '@vercel/kv'

export const kv = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
});

export function getPageVisitsKey() { return KEY_PAGE_VISITS; }

export function getProjectNamesByUserEmailKey(email:string) { return KEY_PROJECT_NAMES_BY_USER_EMAIL.replace('#', email); }


export class Helper {

    constructor() {
        console.log("Creating Helper");
    }

    // *******************************
    // PROJECT FUNCTIONS
    // *******************************

    static async getUserProjectNames(userEmail:string|null) {
        console.log("getUserProjectNames: " + userEmail);
        if (!userEmail) return [];

        const key: string = getProjectNamesByUserEmailKey(userEmail);
        console.log("   getProjectNamesByUserEmailKey: " + key);
        
        try {
            return await kv.get(key) || [];
        } catch (error) {
            // Handle errors
        }
        return [];
    }

    static async addUserProjectName(projectName:string, userEmail:string|null) {
        if (!userEmail || !projectName) return false;
        console.log("addUserProjectNames: " + userEmail);
        console.log('   User email= ' + userEmail + ", key= '" + userEmail);
        console.log('   Add New Project: name= ' + projectName);

        let projects = await this.getUserProjectNames(userEmail) ?? [];
        if ((Array.isArray(projects)) && !projects.includes(projectName)) {

            projects.push(projectName);
            const key = getProjectNamesByUserEmailKey(userEmail);
            try {
                await kv.set(key, projects);
                return true;
            } catch (error) {
                // Handle errors
            }
        } else return fail(422, { projectName: projectName, error: 'Project already exists' });
    }
}