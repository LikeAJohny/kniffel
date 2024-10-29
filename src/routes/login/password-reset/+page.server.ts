import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { data: user, error } = await supabase.auth.resetPasswordForEmail(email);

		if (error) {
			return fail(error.status || 500, { message: error.message, success: false, email });
		}

		return {
			data: user,
			errors: [],
			success: true
		};
	}
};
