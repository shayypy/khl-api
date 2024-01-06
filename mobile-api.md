# KHL mobile API documentation

This is the internal API used by the KHL's mobile apps. All three apps (KHL, WHL, MHL - major, women's, minor) use the same models and simply request different endpoints.

## Base URL

Prefix all below endpoints with one of these, depending on the data you want.

- KHL: `https://khl.api.webcaster.pro/api/khl_mobile`
- WHL: `https://khl.api.webcaster.pro/api/whl_mobile`
- MHL: `https://khl.api.webcaster.pro/api/mhl_mobile`

All of the above may also be substituted with `_site` in place of `_mobile`, but you should avoid doing so since there is little evidence of it being supported as widely.

## Common query parameters

These parameters are used by the apps for almost all requests.

| name          | description                                                  | optional |
|---------------|--------------------------------------------------------------|----------|
| `application` | The client application (`khl_ios`, `khl_web`, `khl_android`) | yes      |
| `deviceid`    | A UUID representing the device. Likely for telemetry         | yes      |
| `installid`   | Unknown. Likely for telemetry, if not deprecated             | yes      |
| `locale`      | The desired locale for the response, defaults to `ru`        | yes      |

## Headers

The apps provide a [`User-Agent`](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) of `KHL/{version} ({device}; {os} {version}; Scale/{version})`. It is optional (for now?). Example on iOS: `KHL/4.11.2 (iPhone; iOS 16.3; Scale/2.00)`

It also explicitly provides [`Accept-Language`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language), again optional, but the `locale` [query parameter](#common-query-parameters) may be preferred.

## Stages

Broadly, a stage is an individual season or postseason. For example, in the major league, stage ID `235` is the 2022-23 regular season and stage ID `259` is the 2022-23 playoffs.

The apps also include a setting to configure which stage you would like to view data in. I assume this also changes which teams & events the API will return to you (& possibly team names/logos), but I have not yet tested extensively.

## IDs

Models tend to come with two IDs: `id` and `khl_id`. Both are integers (although `khl_id` is a Java `long` rather than an `int`) but they are not interchangeable. `id` values can be used within the mobile API for referencing and querying objects, but `khl_id` values are mostly useful for constructing `khl.ru`/`whl.khl.ru`/`mhl.khl.ru` webpage URLs. This property is named `khl_id` for all leagues. Phrases like "event ID" or "team ID" should be assumed to refer to those models' `id` property.

## Common Data

### Get Common Data

`GET /data.json` ([APICommonData](/types/src/payloads/data.ts))

This endpoint returns various "init"-type data you might need for a stateful application.

## Events (games + more)

The "event" terminology is not exclusive to full games, so you may find it necessary to filter by `type_id` where applicable (`24` for broadcasts).

### Get Event

`GET /event_v2.json?id={id}` ([RESTGetAPIEvent](/types/src/rest/event.ts))

#### Query Parameters

Only `id` is required.

| name       | description         |
|------------|---------------------|
| `id`       | The event ID        |
| `stage_id` | [Stage ID](#stages) |
| `cacheid`  | String, unknown     |

### Get Events

`GET /events_v2.json` ([RESTGetAPIEvents](/types/src/rest/event.ts))

#### Query Parameters

All are optional. With no parameters, this endpoint will give you the next 16 games in the schedule.

| name                                | description                              |
|-------------------------------------|------------------------------------------|
| `stage_id`                          | [Stage ID](#stages)                      |
| `q[start_at_gt_time_from_unixtime]` | Events after this timestamp (seconds)    |
| `q[start_at_lt_time_from_unixtime]` | Events before this timestamp (seconds)   |
| `q[team_a_or_team_b_in][]`          | Comma-separated team IDs                 |
| `q[id_in][]`                        | Comma-separated event IDs                |
| `order_direction`                   | `desc` or `asc` by `start_at`            |
| `page`                              | Integer, the first (default) page is `1` |
| `cacheid`                           | String, unknown                          |

## Teams

### Get Team

`GET /team_v2.json?id={id}` ([RESTGetAPITeam](/types/src/rest/team.ts))

#### Query Parameters

Only `id` is required.

| name       | description         |
|------------|---------------------|
| `id`       | The team ID         |
| `stage_id` | [Stage ID](#stages) |

### Get Teams

`GET /teams_v2.json` ([RESTGetAPITeams](/types/src/rest/team.ts))

#### Query Parameters

All are optional.

| name       | description         |
|------------|---------------------|
| `stage_id` | [Stage ID](#stages) |
