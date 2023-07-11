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
	start: (player: Player, variant: Variant, numberOfGames: number) => void;
	updateGame: (game: KniffelGame) => void;
	destroy: () => void;
};

const createSession = (): SessionStore => {
	const storedSession = localStorage.getItem('session');

	const { subscribe, set, update } = writable(
		storedSession ? JSON.parse(storedSession) : initialSession
	);

	subscribe(($session: Session) => {
		const status = $session.games.every((game) => game.status === 'finished')
			? 'finished'
			: 'running';

		if ($session.status !== status) {
			update(($session) => ({
				...$session,
				status,
				finishedAt: status === 'finished' ? new Date() : null
			}));
		}

		localStorage.setItem('session', JSON.stringify($session));
	});

	const start = (player: Player, variant: Variant, numberOfGames: number) => {
		update(($session) => ({
			...$session,
			player,
			variant,
			games: Array(numberOfGames)
				.fill(
					variant.name === 'Kniffel'
						? structuredClone(initialKniffel)
						: structuredClone(initialKniffelExtreme)
				)
				.map((game, index) => ({
					...game,
					number: index
				}))
		}));
	};

	const destroy = () => localStorage.removeItem('session');

	const updateGame = (game: KniffelGame) => {
		update(($session: Session) => {
			const games = $session.games.map((sg) => (game.number === sg.number ? game : sg));
			const score = games.reduce((sum, game) => sum + (game.results.total || 0), 0);

			return { ...$session, games, score };
		});
	};

	return { subscribe, set, update, start, updateGame, destroy };
};

export const session = createSession();
