<script lang="ts">
	import board from '@assets/kniffel-extreme-board.json';
	import { createEventDispatcher } from 'svelte';
	import { createGame } from '@stores/kniffel-extreme.store';
	import NumberField from '@components/NumberField.svelte';
	import BoolField from './BoolField.svelte';

	export let number: number;

	const { scores, results, game } = createGame(number);
	const dispatch = createEventDispatcher();

	game.subscribe((gameState) => {
		dispatch('gameUpdate', gameState);
	});
</script>

<div class="game">
	<div class="game-number">
		{$game.number + 1}. Spiel
	</div>
	<!-- Upper -->
	{#each board.upper as field}
		{#if field.type === 'number'}
			<NumberField bind:value={$scores.upper[field.name]} name={field.name} />
		{/if}
	{/each}
	<div class="field">{$results.upper.sum}</div>
	<div class="field">{$results.upper.bonus}</div>
	<div class="field">{$results.upper.total}</div>
	<hr />
	<!-- Lower -->
	{#each board.lower as field}
		{#if field.type === 'number'}
			<NumberField bind:value={$scores.lower[field.name]} name={field.name} />
		{/if}
		{#if field.type === 'bool'}
			<BoolField bind:value={$scores.lower[field.name]} score={field.score} name={field.name} />
		{/if}
	{/each}
	<div class="field">{$results.lower.total}</div>
	<div class="field">{$results.upper.total}</div>
	<div class="field">{$results.total}</div>
</div>

<style lang="scss">
	.game {
		.game-number {
			display: grid;
			justify-content: center;
			padding: 0.5rem 0;
		}

		.field {
			display: grid;
			justify-content: center;
			align-items: center;
			width: 4em;
			height: 2.5rem;
			border: 1px solid var(--secondary-color);
			color: var(--font-color);
		}
	}
</style>
