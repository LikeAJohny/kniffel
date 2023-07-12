import type { Session } from '@/types/kniffel';

export const session: Session = {
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
