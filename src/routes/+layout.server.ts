import type { LayoutServerLoad } from "./protected/$types"

export const load: LayoutServerLoad = async (event) => {
    return {
        session: await event.locals.getSession(),
    }
}