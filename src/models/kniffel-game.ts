import type { KniffelGame } from '@/types/kniffel';

export const kniffelGame: KniffelGame = {
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
			fullHouse: null,
			smallStraight: null,
			largeStraight: null,
			yahtzee: null,
			chance: null
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
