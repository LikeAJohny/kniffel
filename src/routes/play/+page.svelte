<script lang="ts">
	import { goto } from '$app/navigation';
	import KniffelExtremeSheet from '@components/KniffelExtremeSheet.svelte';
	import KniffelSheet from '@components/KniffelSheet.svelte';
	import { session } from '@stores/session.store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		if (!session || !get(session).player) goto('/');
	});
</script>

{#if $session?.variant?.name === 'Kniffel'}
	<KniffelSheet />
{:else}
	<KniffelExtremeSheet />
{/if}
