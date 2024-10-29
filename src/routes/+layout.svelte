<script>
	import { run } from 'svelte/legacy';

	import '@assets/reset.scss';
	import '@assets/theme.scss';
	import Header from '@components/ui/Header.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	let { supabase, session } = $state(data);
	run(() => {
		({ supabase, session } = data);
	});

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<Header />
<main>
	{@render children?.()}
</main>
<footer></footer>
