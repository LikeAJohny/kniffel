<script lang="ts">
	import NewSession from '@components/NewSession.svelte';

	export let data;
	let { player, variants } = data;
	$: ({ player, variants } = data);
</script>

<section class="new-game">
	<NewSession {player} {variants} />
</section>
