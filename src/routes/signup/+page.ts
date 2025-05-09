// Supabase client to check if user is already logged in
import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // Redirect to home if already signed in
    if (session) {
        throw redirect(302, '/');
    }

    return {};
};
