import type { Writable } from 'svelte/store';
import type { KniffelExtremeGame, KniffelGame, Player, Session, Variant } from './kniffel';

export type SessionStore = Writable<Session> & {
	start: (player: Player, variant: Variant, numberOfGames: number) => void;
	updateGame: (game: KniffelGame | KniffelExtremeGame) => void;
	destroy: () => void;
};
