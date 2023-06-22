export async function load({ locals: { supabase } }) {
	const { data: variants } = await supabase.from('game_variants').select();
	const kniffelVariant = variants?.find((variant) => variant.name === 'Kniffel');
	const kniffelExtremeVariant = variants?.find((variant) => variant.name === 'Kniffel Extreme');

	const { data: kniffelSessions } = await supabase
		.from('sessions')
		.select(
			`
        *,
        player: players(*),
        games: kniffel_games(*)
      `
		)
		.eq('variant_id', kniffelVariant.id);

	const { data: kniffelExtremeSessions } = await supabase
		.from('sessions')
		.select(
			`
        *,
        player: players(*),
        games: kniffel_extreme_games(*)
      `
		)
		.eq('variant_id', kniffelExtremeVariant.id);

	console.log(kniffelSessions, kniffelExtremeSessions);

	return { kniffelSessions, kniffelExtremeSessions };
}
