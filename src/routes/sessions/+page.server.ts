export async function load({ locals: { supabase } }) {
	const { data: sessions } = await supabase.from('sessions').select(`
    *,
    player: players(*),
    games(*, scores:kniffel_scores(*))
  `);

	return { sessions };
}
