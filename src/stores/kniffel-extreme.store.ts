import { derived, writable } from 'svelte/store';
import type { KniffelExtremeGame } from '@/types/kniffel';

const initalScores: KniffelExtremeGame['scores'] = {
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
		twoPairs: null,
		threePairs: null,
		twoThrees: null,
		fullHouse: null,
		largeFullHouse: null,
		smallStraight: null,
		largeStraight: null,
		highway: null,
		yahtzee: null,
		yahtzeeExtreme: null,
		tenOrLess: null,
		thirtyThreeOrMore: null,
		chance: null,
		superChance: null
	}
};

export const createGame = (number: number) => {
	let initial = structuredClone(initalScores);
	const storedSession = localStorage.getItem('session');

	if (storedSession) {
		initial = JSON.parse(storedSession).games[number].scores;
	}

	const scores = writable<KniffelExtremeGame['scores']>(initial);

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
