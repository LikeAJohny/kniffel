import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('password-confirmation') as string;

		if (password !== passwordConfirmation) {
			return fail(400, { message: "Passwords don't match", success: false, email });
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			return fail(error.status || 500, { message: error.message, success: false, email });
		}

		const { error: playerError } = await supabase.from('players').insert({
			id: data.user?.id,
			name: username
		});

		if (playerError) {
			return fail(500, { message: playerError.message, success: false, email });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};
