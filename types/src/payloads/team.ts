import { RESTGetAPIEvents } from "../rest/event";
import { APIFeedItem } from "./feed";
import { APIMinimalPlayer, Role } from "./player";
import { StageType } from "./stage";

export interface APIArena {
	id: number;
	capacity: number;
	phone: string;
	website: string;
	name: string;
	address: string;
	city: string;
	image: string;
	geo: { lat: string; long: string };
}

export enum StatId {
	GamesPlayed = "gp",
	Wins = "w",
	Losses = "l",
	Points = "pts",
	Goals = "gf",
	GoalsAllowed = "ga",
	PenaltyInMinutes = "pim",
	PenaltyInMinutesAgainst = "pima",
	// Players
	/** Minutes */
	TimeOnIce = "toi",
	/** Hours */
	TimeOnIceHours = "time_on_ice",
	/** Kilometers per hour */
	TopSpeed = "top_speed",
	/** Kilometers */
	DistanceSkated = "distance_travelled",
	// Skaters
	/** Minutes */
	GameAverageTimeOnIce = "toi_avg",
	GameAverageShifts = "sft_avg",
	FaceoffsWon = "fow",
	ShootoutWins = "sds",
	GameAveragePenaltyInMinutes = "pim_avg",
	PlusMinus = "pm",
	// Goalies
	ShootoutsPlayed = "sop",
	Saves = "sv",
	Shutouts = "so",
}

/** Some of these are the same as `StatId` but the values are different and
 * would conflict confusingly with that enum. "LongStat" refers to the keys
 * tending away from abbreviations. */
export enum LongStatId {
	Shots = "shots",
	Goals = "goals",
	Faceoffs = "fo",
	FaceoffsWon = "fow",
	TimeOnIce = "toi",
	Shifts = "si",
	PenaltyInMinutes = "pim",
	Hits = "hits",
	BlockedShots = "bls",
	/** Kilometers per hour */
	TopSpeed = "topSpeed",
	DistanceSkated = "distanceTravelled",
	Passes = "allPasses",
	SuccessfulPasses = "successfulPasses",
}

export interface APIStat {
	id: StatId;
	title: string;
	val: number;
	max: number;
	min?: number;
}

export type APILongStat = APIStat & {
	id: LongStatId;
};

/** A team as returned by the `teams` endpoint */
export interface APITeamWithDivision {
	/** The ID of the team */
	id: number;
	/** The KHL ID of the team */
	khl_id: number;
	/** The name of the team */
	name: string;
	/** The city or region where the team is located */
	location: string;
	/** A full URL to an image of the team's logo. Usually in PNG format. */
	image: string;
	/** The division that the team is in. `null` for WHL teams. */
	division: string | null;
	/** The division key (snake_case) that the team is in. `null` for WHL teams. */
	division_key: string | null;
	/** The conference that the team is in. `null` for WHL & MHL teams. */
	conference: string | null;
	/** The conference key (snake_case) that the team is in. `null` for WHL & MHL teams. */
	conference_key: string | null;
}

export interface APIHeadCoach {
  name: string;
	photo: string;
}

export type APITeam = APITeamWithDivision & {
	stage: StageType;
	feed_items: APIFeedItem[];
	/** The arena that the team plays in.
	 *
	 * @deprecated Use `arenas` instead */
	arena: APIArena;
	/** The arenas that the team may play in. */
	arenas: APIArena[];
	calendar_events: RESTGetAPIEvents;
	recent_events: RESTGetAPIEvents;
	website: string;
	mail: string;
	foundation_year: string;
	photo: string;
	phone: string;
	head_coach: APIHeadCoach;
	/** Strings may be empty */
	social_networks: {
		/** Twitter.com */
		tw: string;
		/** VK.com */
		vk: string;
		/** OK.ru */
		ok: string;
		/** Facebook.com */
		fb: string;
		/** Instagram.com */
		instagram: string;
		/** Youtube.com */
		youtube: string;
		/** Telegram.org */
		telegram: string;
	};
  /** Strings may be empty */
	apps: { ios: string; android: string; windows: string };
	address: string;
	stats: APIStat[];
	players: APIMinimalPlayer[];
};

export interface APIEventTeam {
	id: number;
	khl_id: number;
	image: string;
	tv_image?: string;
	name: string;
	location: string;
}

export interface APITeamWithInfoPlayer {
	id: number;
	khl_id: number;
	shirt_number: number;
	name: string;
	role_key: Role;
	image: string | null;
}

export enum NominationId {
	HardestShot = "hardestShot",
	MostDistanceTravelled = "playerWithMostDistanceTravelled",
	/** Alias for `MostDistanceTravelled` */
	MostDistanceTraveled = "playerWithMostDistanceTravelled",
	HighestTopSpeed = "playerWithHighestTopSpeed",
}

export interface APINomination {
	/**
	 * Unique within its array, but not globally.
	 * Identifies the type of nomination.
	 */
	id: NominationId;
	player: Omit<APITeamWithInfoPlayer, "role_key">;
	name: string;
	value: string;
}

export interface APITeamWithInfo extends APIEventTeam {
	shots: number;
	/** Goals for */
	gf: number;
	/** Power play goals */
	ppg: number;
	/** Shots on goal */
	shg: number;
	/** Power play ? */
	ppc: number;
	/** Unknown */
	vbr: number;
	/** Penalty in minutes */
	pim: number;
	total_puck_control_time: number;
	total_distance_travelled: number;
	offensive_blue_line_crossings_count: number;
	top_players: APINomination[];
	start_fives: APITeamWithInfoPlayer;
	players: Array<
		APITeamWithInfoPlayer & {
			match_stats: APILongStat[];
		}
	>;
	active: boolean;
}
