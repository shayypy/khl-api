import { APIEvent } from "./event";
import { APIStage } from "./stage";

export interface APICommonDataTeam {
  id: number;
  khl_id: number;
  name: string;
  image: string;
  tickets_site: string | null;
  about_team: string | null;
}

export interface APIVideoType {
  id: string;
  title: string;
}

export interface APIGeoError {
  // serial_version_uid: bigint;
  country: string;
  licensee_url: string;
  text_error: string;
}

export interface APICommonData {
  /** Unknown, but a client can default to `20` when this is `null`. */
  safe_live_shift: number;
  /** All available stages */
  stages_v2: APIStage[];
  // about_khl: null;
  /** The currently ongoing stage */
  current_stage_id: number;
  /** The team in the current user's 1st "favorite" slot */
  favorite_team_slot_1_id?: number | null;
  /** The team in the current user's 2nd "favorite" slot */
  favorite_team_slot_2_id?: number | null;
  /** The team in the current user's 3rd "favorite" slot */
  favorite_team_slot_3_id?: number | null;
  /** The current latest Android app version */
  android_app_version: string;
  /** The current latest iOS app version */
  ios_app_version: string;
  server_time: number;
  remote_ip: string;
  /** All currently-playing teams */
  teams: APICommonDataTeam[];
  /**
   * Same as `teams`, but also includes divisions as pseudo-teams with
   * an `about_team` of `null`. Most use cases want `teams` instead.
   *
   * Always empty for WHL and MHL.
   */
  teams_for_filter: APICommonDataTeam[];
  current_customer: null;
  push_notification_subscriptions: Array<unknown>;
  transaction_types: {
    id: number;
    android_app_product_id?: string;
    ios_app_product_id?: string;
    season: boolean;
    events_filter_rule: string;
    event_ids?: string;
    teams_filter_rule: string;
    team_ids?: string;
    stages_filter_rule: string;
    stage_ids?: string;
    description?: string;
    custom_data: null;
    amount: number;
    name: string;
  }[];
  transactions: Array<unknown>;
  mqtt_broker: {
    host: string;
    port: number;
    secure: boolean;
    event_topic: string;
  };
  /** API base for Mastercard-related queries */
  mastercard_api: string;
  /**
   * An array of stage IDs in which, presumably, a user is able to purchase
   * content with Mastercard.
   */
  mastercard_enabled_stage_ids: number[];
  /**
   * An array of stage names, up to the 2017-18 regular season.
   *
   * @deprecated Use `stages_v2` instead.
   */
  stages?: string[];
  sms_data: unknown;
  server_day: number;
  test_event: APIEvent;
  stat_url: string;
  exchange_rate_usd: number;
  video_types: APIVideoType[];
  selections: {
    url: string;
    name: string;
  }[];
  balance_payment_services: {
    id: string;
    title: string;
    desc: string;
  }[];
  geo_error: APIGeoError | null;
  country: string;
}
