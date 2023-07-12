import { derived, writable } from 'svelte/store';
import type { KniffelExtremeGame } from '@/types/kniffel';

export const createGame = (initialGame: KniffelExtremeGame) => {
	const scores = writable<KniffelExtremeGame['scores']>(initialGame.scores);

	const results = derived(scores, ($scores) => {
		const uSum = Object.values($scores.upper).reduce((a, b) => (a || 0) + (b || 0), 0) || 0;
		const uBonus = uSum >= 73 ? 45 : 0;
		const uTotal = uSum + uBonus;
		const lTotal = Object.values($scores.lower).reduce((a, b) => (a || 0) + (b || 0), 0) || 0;

		return {
			upper: { sum: uSum, bonus: uBonus, total: uTotal },
			lower: { total: lTotal },
			total: uTotal + (lTotal || 0)
		};
	});

	const game = derived([scores, results], ([$scores, $results]) => {
		return {
			id: initialGame.id,
			number: initialGame.number,
			status: isGameFinished($scores) ? 'finished' : 'running',
			scores: $scores,
			results: $results
		};
	});

	return { scores, results, game };
};

const isGameFinished = (scores: KniffelExtremeGame['scores']) => {
	return (
		Object.values(scores.upper).every((score) => score !== null) &&
		Object.values(scores.lower).every((score) => score !== null)
	);
};
