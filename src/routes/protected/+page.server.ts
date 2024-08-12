import { getProjectNamesByUserEmailKey } from '$lib/server/db'
import { Helper } from '$lib/server/db'
import { kv } from '$lib/server/db'

import { fail } from '@sveltejs/kit';

let projects: string[];

import  crawler from "crawler-request";

export const load = async (event) => {
    const session = await event.locals.getSession();
    const email = session?.user?.email || "";

    // Generate google download link with the doc id
    const googleDriveUrl = "https://drive.google.com/file/d/1ErN_WMlJiCJ1lFkN1ub5-xw0Z8A5GKpU/view?usp=sharing";
    const docId = googleDriveUrl.split("/")[5]
    const downloadUrl = 'https://drive.google.com/uc?id=' + docId + '&export=download';

    crawler(downloadUrl).then(function (response) {
        // handle response
        let parts = response.text.split("\n");
        console.log(response.text.lenght);
    });
    
    return {
        projects: Helper.getUserProjectNames(email)
    };
};

export const actions = {
    default: async ({ cookies, request }) => {
        // Add project.
        const data = await request.formData();
        const userEmail:string = <string>data.get('userEmail') || '';
        const projectName = <string>data.get('projectName') || '';
        
        /*
        const key = getProjectNamesByUserEmailKey(userEmail);

        projects = await kv.get(key) ?? [];

        console.log('User email= ' + userEmail + ", key= '" + key);
        console.log('Add New Project: name= ' + projectName);

        if (!projects.includes(projectName)) {

            projects.push(projectName);

            try {
                await kv.set(key, projects);
            } catch (error) {
                // Handle errors
            }
        } else return fail(422, { projectName: projectName, error: 'Project already exists' });
        */
        return await Helper.addUserProjectName(projectName, userEmail);
    }
};
