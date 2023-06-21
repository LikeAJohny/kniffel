<script lang="ts">
	import { goto } from '$app/navigation';
	import { destroySession } from '../stores/session.store';
	import type { Player, Variant } from '../types';

	export let data;
	let { player, variants } = data;
	$: ({ player, variants } = data);

	let variant: Variant | '' = '';
	let numberOfGames: number | '' = '';

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		destroySession();

		const queryParams = new URLSearchParams({
			player: JSON.stringify(player),
			variant: JSON.stringify(variant),
			'number-of-games': numberOfGames + ''
		}).toString();

		goto(`/play?${queryParams}`);
	}
</script>

<section class="new-game">
	<form method="get" action="/play" on:submit={handleSubmit}>
		<label for="variant">
			<select name="variant" id="variant" bind:value={variant} required>
				<option value="">Select A Variant</option>
				{#each variants as variant}
					<option value={variant}>{variant.name}</option>
				{/each}
			</select>
		</label>
		<label for="number-of-games">
			<input
				type="number"
				name="number-of-games"
				id="number-of-games"
				min="1"
				max="1000"
				placeholder="Number Of Games"
				bind:value={numberOfGames}
			/>
		</label>
		<button>Start</button>
	</form>
</section>
