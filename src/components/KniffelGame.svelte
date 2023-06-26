<script lang="ts">
	import board from '@assets/kniffel-board.json';
	import { createEventDispatcher } from 'svelte';
	import { createGame } from '@stores/kniffel.store';
	import NumberField from './NumberField.svelte';
	import BoolField from './BoolField.svelte';

	export let number: number;

	const { scores, results, game } = createGame(number);
	const dispatch = createEventDispatcher();

	game.subscribe((gameState) => {
		dispatch('gameUpdate', gameState);
	});
</script>

<div class="game">
	<!-- Upper -->
	{#each board.upper as field}
		{#if field.type === 'number'}
			<NumberField bind:value={$scores.upper[field.name]} />
		{/if}
	{/each}
	<div class="field">{$results.upper.sum}</div>
	<div class="field">{$results.upper.bonus}</div>
	<div class="field">{$results.upper.total}</div>
	<hr />
	<!-- Lower -->
	{#each board.lower as field}
		{#if field.type === 'number'}
			<NumberField bind:value={$scores.lower[field.name]} />
		{/if}
		{#if field.type === 'bool'}
			<BoolField bind:value={$scores.lower[field.name]} score={field.score} />
		{/if}
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
