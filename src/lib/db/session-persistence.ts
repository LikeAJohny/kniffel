import type { Game, Session } from '../../types';

export const persistSession = async (supabase, session: Session) => {
	const { data: sessionData, error: sessionError } = await supabase
		.from('sessions')
		.upsert(mapSessionToDb(session))
		.select();

	if (sessionError) throw new Error(sessionError.message);

	const games: any = session.games.map((game) => mapGameToDb(game, sessionData[0].id));

	const { data: gamesData, error: gamesError } = await supabase
		.from('games')
		.upsert(games)
		.select();

	if (gamesError) throw new Error(gamesError.message);

	const scores: any = session.games.map((game, i) => ({
		...mapKniffelScoresToDb(game),
		game_id: gamesData[i].id
	}));

	const { error: scoresError } = await supabase.from('kniffel_scores').upsert(scores).select();

	if (scoresError) throw new Error(scoresError.message);
};

const mapSessionToDb = (session: Session) => {
	return {
		player_id: session.player?.id,
		variant_id: session.variant?.id,
		score: session.score,
		status: session.status,
		started_at: session.startedAt,
		finished_at: session.finishedAt
	};
};

const mapGameToDb = (game: Game, sessionId: string) => {
	return {
		session_id: sessionId,
		number: game.number
	};
};

const mapKniffelScoresToDb = (game: Game) => {
	return {
		game_id: game.id,
		ones: game.scores.upper.ones,
		twos: game.scores.upper.twos,
		threes: game.scores.upper.threes,
		fours: game.scores.upper.fours,
		fives: game.scores.upper.fives,
		sixes: game.scores.upper.sixes,
		three_of_a_kind: game.scores.lower.threeOfAKind,
		four_of_a_kind: game.scores.lower.fourOfAKind,
		full_house: game.scores.lower.fullHouse,
		small_straight: game.scores.lower.smallStraight,
		large_straight: game.scores.lower.largeStraight,
		yahtzee: game.scores.lower.yahtzee,
		chance: game.scores.lower.chance,
		upper_sum: game.results.upper.sum,
		upper_bonus: game.results.upper.bonus,
		upper_total: game.results.upper.total,
		lower_total: game.results.lower.total,
		game_total: game.results.total
	};
};
