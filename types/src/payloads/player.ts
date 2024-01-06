import { APIQuote } from "./event";
import { APIStat, APITeamWithDivision } from "./team";

export enum Role {
  Goaltender = "goaltender",
  Forward = "forward",
  // The app uses "defender" in its enum, but the API uses "defensemen".
  // I'm assuming this is an app/API mistake. The only reference to this is in
  // a `McPlayer` (Mastercard Player) class which has many outdated properties.
  Defenseman = "defensemen",
  // Defender = "defender",
}

export enum Stick {
  Left = "l",
  Right = "r",
}

export interface APIMinimalPlayer {
  id: number;
  khl_id: number;
  image: string | null;
  flag_image_url: string | null;
  g: number;
  a: number;
  role_key: Role;
  name: string;
  /** The player's jersey number */
  shirt_number: number;
  country: string;
}

export enum PositionId {
  /** For skaters, their total points */
  Points = "pts",
  /** For skaters, their total assists */
  Assists = "a",
  /** For skaters, their total goals */
  Goals = "g",
  /** For goalies, their GAA */
  GoalsAgainstAverage = "gaa",
  /** For goalies, their save percentage */
  SavePercentage = "sv_pct",
  /** For goalies, their total shutouts */
  Shutouts = "so",
}

export interface APIPosition {
  /** The type of the statistic */
  id: PositionId;
  /** The value of the statistic */
  pos: number;
  /** The name of the statistic */
  title: string;
}

export interface APIPlayer extends Omit<APIMinimalPlayer, "g" | "a"> {
  /** Centimeters */
  height: number;
  /** Kilograms */
  weight: number;
  /** Years */
  age: number;
  role: string;
  /** Timestamp in seconds */
  birthday: number | null;
  stick: Stick | null;
  /** The player's current team */
  team: APITeamWithDivision;
  stats: APIStat[];
  /** Teams the player has been with in the past, including their current team */
  teams: Omit<
    APITeamWithDivision,
    "division" | "division_key" | "conference" | "conference_key"
  > &
    {
      /**
       * The seasons when this player was on the team, comma-separated.
       * Example: `2021/2022,2022/2023`
       */
      seasons: string;
    }[];
  quotes: APIQuote[];
  seasons_count: {
    /** Seasons played for the current league. Always `khl`, even for other leagues */
    khl: number;
    /** Seasons played for the player's current team */
    team: number;
  };
  /** Statistics held by the player, specific to their position */
  positions: APIPosition[];
}

export type APILightPlayer = Pick<
  APIMinimalPlayer,
  "id" | "khl_id" | "shirt_number" | "image" | "name"
> & {
  /** The player's current team */
  team: Pick<APITeamWithDivision, "id" | "khl_id" | "name" | "location">;
};
