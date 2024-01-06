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
};

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
  shirt_number: number;
  country: string;
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
  team: APITeamWithDivision;
  stats: APIStat[];
  teams: Omit<
    APITeamWithDivision,
    "division" | "division_key" | "conference" | "conference_key"
  > &
    { season: string }[];
  quotes: APIQuote[];
  seasons_count: {
    khl: number;
    team: number;
  };
  positions: Array<unknown>;
}
