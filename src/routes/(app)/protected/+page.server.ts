import { kv } from '@vercel/kv'

import { getProjectsByUserEmailKey } from '$lib/server/db'

import { fail } from '@sveltejs/kit';

let projects = [];

export const load = async (event) => {
    const session = await event.locals.getSession();
    const key = getProjectsByUserEmailKey(session?.user?.email);
    console.log("getProjectsByUserEmailKey: " + key);
    try {
        const projects = await kv.get(key) || [];
        console.log("projects="+projects);
        return {
            projects: projects
        };
    } catch (error) {
        // Handle errors
    }
};

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const userEmail = data.get('userEmail') || '';
        const key = getProjectsByUserEmailKey(userEmail);
        const projectName = <string>data.get('projectName');
        
        console.log('User email= ' + userEmail + ", key= '" + key);
        console.log('Add New Project: name= ' + projectName);

        if (!projects.includes(projectName)) {
            projects.push(<string>data.get('projectName'));

            //const pageVisits = await kv.get<number>(getPageVisitsKey())
            try {
                await kv.set(key, projects);
            } catch (error) {
                // Handle errors
            }
        } else return fail(422, { projectName: projectName, error: 'Project already exists' });
    }
};
