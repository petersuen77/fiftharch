import { getProjectNamesByUserEmailKey } from '$lib/server/db'
import { Helper } from '$lib/server/db'
import { kv } from '$lib/server/db'

let projects: string[];

/* Using "import crawler from "crawler-request";" causes a Cheerio dependency error because crawler-request checks for if 
(!module.parent), and module only has a parent if crawler-request is run as a script than as a module. So using import 
causes the wrong behavior where parent is null, but it should not be, bc it is being run in this app. Which means we need 
to next lines of code to import "require".
*/
import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const crawler = require('crawler-request');

export const load = async (event) => {
    const session = await event.locals.getSession();
    const email = session?.user?.email || "";

    // Generate google download link with the doc id
    const googleDriveUrl = "https://drive.google.com/file/d/1ErN_WMlJiCJ1lFkN1ub5-xw0Z8A5GKpU/view?usp=sharing";
    const docId = googleDriveUrl.split("/")[5]
    const downloadUrl = 'https://drive.google.com/uc?id=' + docId + '&export=download';

    /* Test code for using pdf parser
    crawler(downloadUrl).then(function (response) {
        // handle response
        let parts = response.text.split("\n");
        console.log(response.text.lenght);
    });
    */
    
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
    
        return await Helper.addUserProjectName(projectName, userEmail);
    }
};
