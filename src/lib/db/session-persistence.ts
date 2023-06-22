import type { SupabaseClient } from '@supabase/supabase-js';
import type { KniffelExtremeGame, KniffelGame, Session } from '@/types/kniffel';

export const persistSession = async (supabase: SupabaseClient, session: Session) => {
	const { data: sessionData, error: sessionError } = await supabase
		.from('sessions')
		.insert(mapSessionToDb(session))
		.select();

	if (sessionError) console.error(sessionError.message);
	if (!sessionData) return;

	const games = session.games.map((game, i) => ({
		...(session.variant?.name === 'Kniffel'
			? mapKniffelGamesToDb(game, sessionData[i].id)
			: mapKniffelExtremeGamesToDb(game, sessionData[i].id))
	}));

	const { error: gamesError } = await supabase
		.from(session.variant?.name === 'Kniffel' ? 'kniffel_games' : 'kniffel_extreme_games')
		.insert(games)
		.select();

	if (gamesError) console.error(gamesError.message);
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

const mapKniffelGamesToDb = (game: KniffelGame, sessionId: string) => {
	return {
		session_id: sessionId,
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

const mapKniffelExtremeGamesToDb = (game: KniffelExtremeGame, sessionId: string) => {
	return {
		session_id: sessionId,
		ones: game.scores.upper.ones,
		twos: game.scores.upper.twos,
		threes: game.scores.upper.threes,
		fours: game.scores.upper.fours,
		fives: game.scores.upper.fives,
		sixes: game.scores.upper.sixes,
		three_of_a_kind: game.scores.lower.threeOfAKind,
		four_of_a_kind: game.scores.lower.fourOfAKind,
		two_pairs: game.scores.lower.twoPairs,
		three_pairs: game.scores.lower.threePairs,
		two_threes: game.scores.lower.twoThrees,
		full_house: game.scores.lower.fullHouse,
		large_full_house: game.scores.lower.largeFullHouse,
		small_straight: game.scores.lower.smallStraight,
		large_straight: game.scores.lower.largeStraight,
		highway: game.scores.lower.highway,
		yahtzee: game.scores.lower.yahtzee,
		yahtzee_extreme: game.scores.lower.yahtzeeExtreme,
		ten_or_less: game.scores.lower.tenOrLess,
		thirty_tree_or_more: game.scores.lower.thirtyThreeOrMore,
		chance: game.scores.lower.chance,
		super_chance: game.scores.lower.superChance,
		upper_sum: game.results.upper.sum,
		upper_bonus: game.results.upper.bonus,
		upper_total: game.results.upper.total,
		lower_total: game.results.lower.total,
		game_total: game.results.total
	};
};
