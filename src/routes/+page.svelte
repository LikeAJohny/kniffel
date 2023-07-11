<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Variant } from '@/types/kniffel';
	import { session } from '@stores/session.store';

	export let data;
	let { player, variants } = data;
	$: ({ player, variants } = data);

	let variant: Variant | '' = '';
	let numberOfGames: number | '' = '';

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (variant === '' || numberOfGames === '') {
			alert('Please fill in all the fields');
			return;
		}

		session.destroy();
		session.start(player, variant, numberOfGames);
		goto('/play');
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
