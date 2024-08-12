import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import {
    GITHUB_ID,
    GITHUB_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

import { sequence } from '@sveltejs/kit/hooks';

export const firstHandle = SvelteKitAuth({
    //adapter: UpstashRedisAdapter(kv),
    providers: [
        GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
        GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
    ],
    
    /* Use code below to extend "session" - but not sure how to fix type error, so commenting this out for now.
    callbacks: {
        async session({ session }) {
            console.log('session ', session)
            console.log('user ', session.user)
            if (session.user) {
                session.projectNames = await Helper.getUserProjectNames(session?.user?.email || '');
            }
            return session;
        },
    },
    */
    debug: true,
});

/** @type {import('@sveltejs/kit').Handle} */
export async function secondHandle({ event, resolve }) {
    // Initialize the game.
    //await Helper.loadGame();

    const response = await resolve(event);
    return response;
}

export const handle = sequence(firstHandle, secondHandle);