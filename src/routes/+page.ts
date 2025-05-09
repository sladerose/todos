import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

// This load function runs before the home page renders
export const load = async () => {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // Redirect to login if not authenticated
    if (!session) {
        throw redirect(302, '/login');
    }

    // Otherwise, allow page to load
    return { session };
};
