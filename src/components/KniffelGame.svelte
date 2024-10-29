<script lang="ts">
	import board from '@assets/kniffel-board.json';
	import { createEventDispatcher } from 'svelte';
	import { createGame } from '@stores/kniffel.store';
	import NumberField from './NumberField.svelte';
	import BoolField from './BoolField.svelte';
	import type { KniffelGame } from '@/types/kniffel';

	interface Props {
		number: number;
	}

	let { number }: Props = $props();

	const { scores, results, game } = createGame(number);
	const dispatch = createEventDispatcher();

	game.subscribe(($game) => dispatch('gameUpdate', $game));

	function upperFieldName(fieldName: string) {
		return fieldName as keyof KniffelGame['scores']['upper'];
	}

	function lowerFieldName(fieldName: string) {
		return fieldName as keyof KniffelGame['scores']['lower'];
	}
</script>

<div class="game">
	<!-- Upper -->
	{#each board.upper as field}
		{#if field.type === 'number'}
			<NumberField
				bind:value={$scores.upper[upperFieldName(field.name)]}
				name={`game-${$game.number}_${field.name}`}
			/>
		{/if}
	{/each}
	<div class="field">{$results.upper.sum}</div>
	<div class="field">{$results.upper.bonus}</div>
	<div class="field">{$results.upper.total}</div>
	<hr />
	<!-- Lower -->
	{#each board.lower as field}
		{#if field.type === 'number'}
			<NumberField
				bind:value={$scores.lower[lowerFieldName(field.name)]}
				name={`game-${$game.number}_${field.name}`}
			/>
		{/if}
		{#if field.type === 'bool'}
			<BoolField
				bind:value={$scores.lower[lowerFieldName(field.name)]}
				score={field.score}
				name={`game-${$game.number}_${field.name}`}
			/>
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
			border: 1px solid var(--secondary-color);
			color: var(--font-color);
		}
	}
</style>
