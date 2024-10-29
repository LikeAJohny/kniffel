<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player, Variant } from '@/types/kniffel';
	import { session } from '@stores/session.store';

	interface Props {
		player: Player;
		variants: Variant[];
	}

	let { player, variants }: Props = $props();

	let variant: Variant = $state(variants[0]);
	let numberOfGames = $state(1);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		session.destroy();
		session.start(player, variant, numberOfGames);
		goto('/play');
	}
</script>

<form method="get" action="/play" onsubmit={handleSubmit}>
	<label for="variant">
		<select name="variant" id="variant" bind:value={variant} required>
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
