import { redirect } from '@sveltejs/kit';
import type { Player } from '../types.js';

export async function load({ locals: { supabase } }) {
	const user = await supabase.auth.getUser();
	const { data: player } = await supabase.from('players').select().eq('id', user.data.user?.id);
	const { data: variants } = await supabase.from('game_variants').select();

	if (!player) throw redirect(303, '/');

	return {
		player: player[0] as Player,
		variants: variants ?? []
	};
}
