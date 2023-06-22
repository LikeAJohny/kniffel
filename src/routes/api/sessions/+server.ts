import { persistSession } from '@lib/db/session-persistence.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
	const session = await request.json();

	persistSession(supabase, session);

	return json('success maybe?');
}
