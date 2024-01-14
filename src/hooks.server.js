import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import {
    GITHUB_ID,
    GITHUB_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

import { kv } from '@vercel/kv';
import { Redis } from "@upstash/redis";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"

export const handle = SvelteKitAuth({
    adapter: UpstashRedisAdapter(kv),
    providers: [
        GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
        GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
    ],
    debug: true,
});

