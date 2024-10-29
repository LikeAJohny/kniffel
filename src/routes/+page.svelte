<script lang="ts">
	import { run } from 'svelte/legacy';

	import NewSession from '@components/NewSession.svelte';

	let { data } = $props();
	let { player, variants } = $state(data);
	run(() => {
		({ player, variants } = data);
	});
</script>

<section class="new-game">
	<NewSession {player} {variants} />
</section>
