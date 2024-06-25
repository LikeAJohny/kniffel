import { redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase } }) {
	const { error } = await supabase.auth.signOut();

	if (error) console.error(error);
	else redirect(303, '/');
}
