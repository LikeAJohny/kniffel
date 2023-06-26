export async function load({ locals: { supabase } }) {
	const { data: kniffelSessions } = await supabase.from('kniffel_sessions_view').select();
	const { data: kniffelExtremeSessions } = await supabase
		.from('kniffel_extreme_sessions_view')
		.select();

	return { kniffelSessions, kniffelExtremeSessions };
}
