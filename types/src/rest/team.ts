import { APITeam, APITeamWithDivision } from "../payloads/team";

export type RESTGetAPITeams = { team: APITeamWithDivision }[];

export type RESTGetAPITeam = { team: APITeam };
