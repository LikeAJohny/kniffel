import { derived, writable } from 'svelte/store';
import type { Game } from '../types';

const initalScores = {
	upper: {
		ones: null,
		twos: null,
		threes: null,
		fours: null,
		fives: null,
		sixes: null
	},
	lower: {
		threeOfAKind: null,
		fourOfAKind: null,
		fullHouse: null,
		smallStraight: null,
		largeStraight: null,
		yahtzee: null,
		chance: null
	}
};

export const createGame = (number: number) => {
	let initial = structuredClone(initalScores);
	const storedSession = localStorage.getItem('session');

	if (storedSession) {
		initial = JSON.parse(storedSession).games[number].scores;
	}

	const scores = writable<Game['scores']>(initial);

	const results = derived(scores, ($scores) => {
		const uSum = Object.values($scores.upper).reduce((a, b) => (a || 0) + (b || 0), 0) || 0;
		const uBonus = uSum >= 63 ? 35 : 0;
		const uTotal = uSum + uBonus;
		const lTotal = Object.values($scores.lower).reduce((a, b) => (a || 0) + (b || 0), 0) || 0;

		return {
			upper: { sum: uSum, bonus: uBonus, total: uTotal },
			lower: { total: lTotal },
			total: uTotal + (lTotal || 0)
		};
	});

	const game = derived([scores, results], ([$scores, $results]) => {
		const finished =
			Object.values($scores.upper).every((score) => score !== null) &&
			Object.values($scores.lower).every((score) => score !== null);

		return {
			number,
			status: finished ? 'finished' : 'running',
			scores: $scores,
			results: $results
		};
	});

	return { scores, results, game };
};
