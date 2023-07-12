import type { KniffelExtremeGame } from '@/types/kniffel';

export const kniffelExtremeGame: KniffelExtremeGame = {
	id: null,
	number: 0,
	status: 'running',
	scores: {
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
	},
	results: {
		upper: {
			sum: 0,
			bonus: 0,
			total: 0
		},
		lower: {
			total: 0
		},
		total: 0
	}
};
