import type { KniffelGame, Player, Session, Variant } from '@/types/kniffel';
import type { SessionStore } from '@/types/stores';
import { kniffelExtremeGame } from '@models/kniffel-extreme-game';
import { kniffelGame } from '@models/kniffel-game';
import { session as sessionModel } from '@models/session';
import { writable } from 'svelte/store';

const createSession = (): SessionStore => {
	const storedSession = localStorage.getItem('session');

	const { subscribe, set, update } = writable(
		storedSession ? JSON.parse(storedSession) : sessionModel
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
						? structuredClone(kniffelGame)
						: structuredClone(kniffelExtremeGame)
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
