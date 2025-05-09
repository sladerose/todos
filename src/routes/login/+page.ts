// Import Supabase client to check session
import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

// This load function runs before rendering the login page
export const load = async () => {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // If user is already logged in, redirect them to the home page
    if (session) {
        throw redirect(302, '/');
    }

    // Otherwise, allow the login page to render
    return {};
};
