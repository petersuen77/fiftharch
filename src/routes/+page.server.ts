import {
  kv
} from '@vercel/kv'

/** @type {import('./$types').PageLoad} */
export async function load() {
  const pageVisits = await kv.get<number>('pageVisits')
  await kv.set('pageVisits', (pageVisits || 0) + 1)
  const updatedPageVisits = await kv.get('pageVisits')
  
  return {
    pageVisits: updatedPageVisits,
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    // Process the form data and perform actions
    return { success: true };
  },
};

