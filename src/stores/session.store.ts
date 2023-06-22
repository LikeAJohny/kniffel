import { writable, type Writable } from 'svelte/store';
import type { KniffelExtremeGame, KniffelGame, Player, Session, Variant } from '@/types/kniffel';

const initialKniffel: KniffelGame = {
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

const initialKniffelExtreme: KniffelExtremeGame = {
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

const initialSession: Session = {
	id: null,
	player: null,
	variant: null,
	games: [],
	score: 0,
	status: 'running',
	startedAt: new Date(),
	finishedAt: null,
	duration: null
};

export type SessionStore = Writable<Session> & {
	updateGame: (game: KniffelGame) => void;
};

export const createSession = (
	player: Player,
	variant: Variant,
	numberOfGames: number
): SessionStore => {
	let initial = initialSession;
	const storedSession = localStorage.getItem('session');

	if (storedSession) {
		initial = JSON.parse(storedSession);
	}

	const { subscribe, set, update } = writable(initial);

	if (!storedSession) {
		update((sessionState) => ({
			...sessionState,
			player,
			variant,
			games: Array(numberOfGames)
				.fill(
					variant.name == 'kniffel'
						? structuredClone(initialKniffel)
						: structuredClone(initialKniffelExtreme)
				)
				.map((game, index) => ({
					...game,
					number: index
				}))
		}));
	}

	subscribe((sessionState) => {
		const status = sessionState.games.every((game) => game.status === 'finished')
			? 'finished'
			: 'running';

		if (sessionState.status !== status) {
			update((sessionState) => ({
				...sessionState,
				status,
				finishedAt: status === 'finished' ? new Date() : null
			}));
		}

		localStorage.setItem('session', JSON.stringify(sessionState));
	});

	const updateGame = (game: KniffelGame) => {
		update((sessionState) => {
			const games = sessionState.games.map((sg) => (game.number === sg.number ? game : sg));
			const score = games.reduce((sum, game) => sum + (game.results.total || 0), 0);

			return { ...sessionState, games, score };
		});
	};

	return { subscribe, set, update, updateGame };
};

export const destroySession = () => localStorage.removeItem('session');
