<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createGame } from '@stores/kniffel.store';

	export let number: number;

	const { scores, results, game } = createGame(number);
	const dispatch = createEventDispatcher();

	game.subscribe((gameState) => {
		dispatch('gameUpdate', gameState);
	});
</script>

<div class="game">
	<!-- Upper -->
	{#each Object.entries($scores.upper) as [field, value]}
		<div class="field">
			<input
				type="number"
				id={`${number}-${field}`}
				name={`${number}-${field}`}
				bind:value={$scores.upper[field]}
			/>
		</div>
	{/each}
	<div class="field">{$results.upper.sum}</div>
	<div class="field">{$results.upper.bonus}</div>
	<div class="field">{$results.upper.total}</div>
	<hr />
	<!-- Lower -->
	{#each Object.keys($scores.lower) as field}
		<div class="field">
			<input
				type="number"
				id={`${number}-${field}`}
				name={`${number}-${field}`}
				bind:value={$scores.lower[field]}
			/>
		</div>
	{/each}
	<div class="field">{$results.lower.total}</div>
	<div class="field">{$results.upper.total}</div>
	<div class="field">{$results.total}</div>
</div>

<style lang="scss">
	.game {
		width: max-content;
		border-right: 1px solid var(--secondary-color);

		&:last-of-type {
			border-right: none;
		}

		.field {
			display: grid;
			justify-content: center;
			align-items: center;
			width: 4em;
			height: 2.5rem;
			border-bottom: 1px solid var(--secondary-color);
			color: var(--font-color);

			&:last-of-type {
				border-bottom: none;
			}

			input {
				width: 100%;
				height: 100%;
				font-size: 1.1rem;
				font-weight: 700;
				text-align: center;
				border: none;
				background: none;
				color: var(--font-color);
			}
		}
	}
</style>
