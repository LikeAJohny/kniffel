export type KniffelGame = {
	id: string | null;
	number: number;
	status: 'running' | 'finished';
	scores: {
		upper: {
			ones: number | null;
			twos: number | null;
			threes: number | null;
			fours: number | null;
			fives: number | null;
			sixes: number | null;
		};
		lower: {
			threeOfAKind: number | null;
			fourOfAKind: number | null;
			fullHouse: number | null;
			smallStraight: number | null;
			largeStraight: number | null;
			yahtzee: number | null;
			chance: number | null;
		};
	};
	results: {
		upper: {
			sum: number | null;
			bonus: number | null;
			total: number | null;
		};
		lower: {
			total: number | null;
		};
		total: number | null;
	};
};

export type KniffelExtremeGame = {
	id: string | null;
	number: number;
	status: 'running' | 'finished';
	scores: {
		upper: {
			ones: number | null;
			twos: number | null;
			threes: number | null;
			fours: number | null;
			fives: number | null;
			sixes: number | null;
		};
		lower: {
			threeOfAKind: number | null;
			fourOfAKind: number | null;
			twoPairs: number | null;
			threePairs: number | null;
			twoThrees: number | null;
			fullHouse: number | null;
			largeFullHouse: number | null;
			smallStraight: number | null;
			largeStraight: number | null;
			highway: number | null;
			yahtzee: number | null;
			yahtzeeExtreme: number | null;
			tenOrLess: number | null;
			thirtyThreeOrMore: number | null;
			chance: number | null;
			superChance: number | null;
		};
	};
	results: {
		upper: {
			sum: number | null;
			bonus: number | null;
			total: number | null;
		};
		lower: {
			total: number | null;
		};
		total: number | null;
	};
};

export type Session = {
	id: string | null;
	player: Player | null;
	variant: Variant | null;
	games: KniffelGame[] | KniffelExtremeGame[];
	score: number;
	status: 'running' | 'finished' | 'saved';
	startedAt: Date;
	finishedAt: Date | null;
	duration: number | null;
};

export type Player = {
	id: string;
	name: string;
};

export type Variant = {
	id: string;
	name: string;
};
