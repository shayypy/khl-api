import { StageType } from "./stage";
import { APIArena, APIEventTeam, APITeamWithInfo } from "./team";

export interface APIAudioTrack {
  id: string;
  title: string;
}

export interface APIGenericEvent {
	id: number;
	start_ts: number;
	finish_ts: number;
	description: string;
	image_url: string;
	m3u8_url: string | null;
	feed_url: string | null;
	iframe_url: string | null;
	iframe_code: string | null;
	audio_tracks: APIAudioTrack[];
	stage_id: number;
	free: boolean;
	yandex_rights: boolean;
	yandex_id: string | null;
	match_id: string;
	balancer_type: BalancerType;
  /** A description of the event type, usually in Russian */
	event_or_quote_type_name: string;
	outer_stage_id: number;
	stage_name: string;
}

export interface APIQuote extends APIGenericEvent {
	quote_type_name_key: string;
	quote_type_name: string;
	balancer_type: BalancerType.Quote;
}

export interface KhlEventGoal {
	time: number;
	score: string;
	period: number;
	status: string;
	status_abbr: string;
	assistants: { shirt_number: number; name: string; aps: number }[];
	author: {
		shirt_number: number;
		name: string;
		gps: number;
		team_id: number;
	};
	quote: APIQuote;
}

export interface APIViolation {
	time: number;
	penalty_time: number;
	period: number;
	penalty_reason: string;
	violator: {
		shirt_number: number;
		name: string;
		team_id: number;
		team: { id: number };
	};
	quote: APIQuote;
}

export enum TranslationEntryType {
  /**
   * Miscellaneous information about the game. May include (in the `text`
   * property) starting lineups, "commercial break", statistics, or anything
   * else. Intended to be displayed as though it were a paragraph on a webpage.
   * Always in Russian.
  */
	Info = "info",
  /** A goal was scored */
	Goal = "goal",
  /**
   * The goaltender was replaced
   * 
   * Possibly deprecated as this is not used in-app.
   */
	GoaltenderChange = "replace",
  /** Start/end of the game/period */
	State = "state",
	Penalty = "violation",
  Violation = "violation",
}

export interface APITranslationEntry {
	seconds: number;
	type: TranslationEntryType;
	period: number | null;
  /** A string representing the time remaining in the period, sometimes `- min` when not applicable */
	time_s: string;
	text: string;
	score: string;
	m3u8_url: string | null;
	feed_url: string | null;
	iframe_url: string | null;
	iframe_code: string | null;
	quote_id: number | null;
	quote_name: string | null;
	stage_id: number;
	free: boolean;
	yandex_rights: boolean;
	yandex_id: string | null;
	match_id: string;
	balancer_type: BalancerType | null;
	event_or_quote_type_name: string | null;
	outer_stage_id: number;
	stage_name: string;
}

export interface APITransactionType {
	id: number;
	android_app_product_id: string;
	ios_app_product_id: string;
	smarttv_app_product_id: string;
	name: string;
	time: number;
	amount: number;
	season: boolean;
	events_filter_rule: string;
	event_ids: string;
	teams_filter_rule: string;
	team_ids: string;
	stages_filter_rule: string;
	stage_ids: string;
	description: string;
	custom_data: unknown | null;
}

export enum State {
	Finished = "finished",
	InProgress = "in_progress",
	Soon = "not_yet_started",
}

export enum EventType {
	// Type 2 events do not seem to have a type name.
	// It is probably deprecated because the only examples
	// I could find were from the 2013 postseason, including
	// many GoPro clips of the postgame(s). One was labeled
	// Salei cup (likely https://internationalhockeywiki.com/ihw?curid=11169).
	// PlayoffMoment = 2,
	Highlight = 4,
	Moment = 6,
	BodyCheck = 10,
	Penalty = 18,
	Broadcast = 24,
	Goal = 28,
	ScoringChance = 30,
	Save = 32,
	Fight = 34,
	Shootout = 36,
	Top10 = 37,
	ShootoutSeries = 38,
	InterestingMoment = 45,
}

export interface APIMinimalEvent {
	id: number;
  /** The current score (home:away) */
	score: string;
  /** The type of event */
	type_id: EventType;
	/** KHL.ru game ID (type_id 2) */
	khl_id: number;
	/** Home */
	team_a: APIEventTeam;
	/** Away */
	team_b: APIEventTeam;
  /**
   * The name of the event. For broadcasts (games), usually follows the format "{team_a.name} - {team_b.name}".
   * The app calls `Html.fromHtml` on this string before displaying it, which implies it may include HTML.
   * https://developer.android.com/reference/android/text/Html#fromHtml(java.lang.String,%20int)
   */
	name: string;
	/** Timestamp in ms */
	start_at: number;
	/** Timestamp in ms */
	event_start_at: number;
	/** Timestamp in ms */
	end_at: number;
  /** The scores throughout the periods of the game */
	scores: {
    /** Final score (home:away) at the end of the 1st period */
		first_period: string | null;
    /** Final score (home:away) at the end of the 2nd period */
		second_period: string | null;
    /** Final score (home:away) at the end of the 3rd period */
		third_period: string | null;
    /** Final score (home:away) at the end of the overtime period */
		overtime: string | null;
		/** Final score (home:away) at the end of the shootout (Буллит) */
		bullitt: string | null;
	};
}

export enum BalancerType {
  File = "file",
  Record = "record",
  Quote = "quote",
  Live = "live",
};

export interface APIEvent extends APIMinimalEvent {
  /** The current state of the game */
	game_state_key: State;
	/** Could be `-1` for a `finished` game */
	period: number | null;
  /** Whether the broadcast or related video is in high definition */
	hd: boolean;
	stage_id: number | null;
	commentator: boolean;
	likes_enabled: boolean | null;
	tickets: string | null;
	location: string | null;
	/** Timestamp in seconds */
	start_at_day: number;
	not_regular: boolean | null;
	score: string;
	sscore: null;
	image: string;
	condensed_game_id: null;
	highlight_id: null;
	infographics: string;
	infographics_enabled: boolean;
	has_video: boolean;
	m3u8_url: string | null;
	feed_url: string | null;
	iframe_url: string | null;
	iframe_code: string | null;
	free: boolean;
	yandex_rights: boolean;
	yandex_id: string | null;
	match_id: string | null;
	balancer_type: BalancerType;
	event_or_quote_type_name: string | null;
	/** `khl_id` of the stage */
	outer_stage_id: number | null;
	/** Season name, e.g. Regular 2023/2024 */
	stage_name: string | null;
}

export interface APIEventWithInfo extends APIEvent {
	season: string;
	arena: APIArena;
	team_a: APITeamWithInfo;
	team_b: APITeamWithInfo;
	quotes: { quote: APIQuote }[];
	goals: KhlEventGoal[];
	violations: APIViolation[];
	other_events_with_both_teams: {
		event: APIMinimalEvent;
	}[];
	social_tags: string[];
	stage_name: string;
	parent_id: number | null;
	mref1: string;
	mref2: string;
	lref1: string;
	lref2: string;
	announce: null;
	views: string;
	stage_type: StageType;
	audio_tracks: { id: string; title: string }[];
	image_big: string | null;
	text_events: APITranslationEntry[];
	condensed_game: APIGenericEvent;
	highlight: APIGenericEvent;
	outer_url: string;
	this_pair_stat: {
		events_count: number;
		team_a: { wins_count: number; goals_count: number; points_count: number };
		team_b: { wins_count: number; goals_count: number; points_count: number };
	};
	transaction_types: APITransactionType[];
	commentators_names: string;
	bets: {
		team_a_win: number;
		draw: number;
		team_b_win: number;
		url: string;
	};
	transactions: Array<unknown>;
	geo_error: null;
}
