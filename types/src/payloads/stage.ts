export enum StageType {
  Regular = "regular",
  Playoff = "playoff",
};

export const SEASON_RE = /\d\d(\d\d)\/\d\d(\d\d)/;

/**
 * A regular or playoff season. This model is aliased to "Tournament" in the
 * apps, but for API consistency we are using "stage" here.
 */
export interface APIStage {
  id: number;
  khl_id: number;
  title: string;
  /** The type of stage */
  type: StageType;
  /**
   * The season years that the stage covers. The apps provide a regex pattern
   * to match this value: `/\d\d(\d\d)\/\d\d(\d\d)/` (`SEASON_RE`).
   */
  season: string;
  percent_points_scored: boolean;
}
