import { redirect, error } from '@sveltejs/kit';
import { getProjectNamesByUserEmailKey } from '$lib/server/db'
import { Helper } from '$lib/server/db'
import { kv } from '$lib/server/db'

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
    const session = await event.locals.getSession();
    const email = session?.user?.email || "";
    const projectName: string = event.params["projectName"];
    
    return {
        prj: { name: projectName }
    };
};

export const actions = {
    /*default: async ({ cookies, request }) => {
    },*/

    addProject: async ({ cookies, request }) => {
        // Add project
        const data = await request.formData();
        const userEmail: string = <string>data.get('userEmail') || '';
        const projectName = <string>data.get('projectName') || '';

        return await Helper.addUserProjectName(projectName, userEmail);
    },

    deleteProject: async ({ cookies, request }) => {
        // Delete project
        const data = await request.formData();
        const userEmail: string = <string>data.get('userEmail') || '';
        const projectName = <string>data.get('projectName') || '';
        const deletedProject = await Helper.deleteUserProject(projectName, userEmail);
        if (Array.isArray(deletedProject) && deletedProject.length == 0 && deletedProject[0] == projectName)
            error(404, 'Error in deleting project ' + projectName);
        throw redirect(303, '/protected');
    },
};
