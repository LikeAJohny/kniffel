<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import { get } from 'svelte/store';
	import KniffelSheet from '@components/KniffelSheet.svelte';
	import KniffelExtremeSheet from '@components/KniffelExtremeSheet.svelte';
	import { createSession } from '@stores/session.store';

	const player = JSON.parse($page.url.searchParams.get('player') as string);
	const variant = JSON.parse($page.url.searchParams.get('variant') as string);
	const numberOfGames = parseInt($page.url.searchParams.get('number-of-games') || '0');

	const session = createSession(player, variant, numberOfGames);
	setContext('session', session);

	onMount(() => {
		if (!session || !get(session).player) goto('/');
	});
</script>

{#if variant === 'Kniffel'}
	<KniffelSheet />
{:else}
	<KniffelExtremeSheet />
{/if}
