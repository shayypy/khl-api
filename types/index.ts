export * from "./src/payloads";
export * from "./src/rest";

/** Base API URL for all requests in every league */
export const API_BASE = "https://khl.api.webcaster.pro/api";

/** Get data based on league prefix */
export const APIRouteBases = {
  /** KHL data as per the KHL mobile app */
  khl: `${API_BASE}/khl_mobile`,
  /** The KHL site(s) - khl.ru, video.khl.ru, ... */
  khlSite: `${API_BASE}/khl_site`,
  /** WHL data as per the WHL mobile app */
  whl: `${API_BASE}/whl_mobile`,
  /** The WHL site. Works but not recommended */
  whlSite: `${API_BASE}/whl_site`,
  /** MHL data as per the MHL mobile app */
  mhl: `${API_BASE}/mhl_mobile`,
  /** The MHL site. Works but not recommended */
  mhlSite: `${API_BASE}/mhl_site`,
} as const;

export const SiteBases = {
  khl: "https://www.khl.ru",
  khlEn: "https://en.khl.ru",
  khlCn: "https://cn.khl.ru",
  khlText: "https://text.khl.ru",
  khlVideo: "https://video.khl.ru",
  whl: "https://whl.khl.ru",
  mhl: "https://mhl.khl.ru",
} as const;

export const Routes = {
  /**
   * Route for:
   * - GET /buy.js
   */
  buy() {
    return "/buy.js" as const;
  },

  /**
   * Route for:
   * - GET /cancel_subscription.json
   */
  cancelSubscription() {
    return "/cancel_subscription.json" as const;
  },

  /**
   * Route for:
   * - GET /change_subscription.json
   */
  changeSubscription() {
    return "/change_subscription.json" as const;
  },

  /**
   * Route for:
   * - PUT /customer_settings.json (x-www-form-urlencoded)
   */
  customerSettings() {
    return "/customer_settings.json" as const;
  },

  /**
   * Route for:
   * - GET /data.json
   */
  data() {
    return "/data.json" as const;
  },

  /**
   * Route for:
   * - DELETE /delete_account.json
   */
  deleteAccount() {
    return "/delete_account.json" as const;
  },

  /**
   * Route for:
   * - GET /event_v2.json
   */
  event() {
    return "/event_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /events_v2.json
   */
  events() {
    return "/events_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /events_alloc.json
   */
  eventsAlloc() {
    return "/events_alloc.json" as const;
  },

  /**
   * Route for:
   * - GET /feed_v2.json
   */
  feed() {
    return "/feed_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /feed_alloc.json
   */
  feedAlloc() {
    return "/feed_alloc.json" as const;
  },

  /**
   * Route for:
   * - GET /leaders_v2.json
   */
  leaders() {
    return "/leaders_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /login.json
   */
  login() {
    return "/login.json" as const;
  },

  /**
   * Route for:
   * - GET /social_network_login.json
   */
  socialNetworkLogin() {
    return "/social_network_login.json" as const;
  },

  /**
   * Route for:
   * - GET /logout.json
   */
  logOut() {
    return "/logout.json" as const;
  },

  /**
   * Route for:
   * - GET /players_v2.json
   */
  players() {
    return "/players_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /players_v2_light.json
   */
  playersLight() {
    return "/players_v2_light.json" as const;
  },

  /**
   * Route for:
   * - GET /playlists.json
   */
  playlists() {
    return "/playlists.json" as const;
  },

  // This endpoint does not have a league prefix. It's here for posterity, but
  // since I do not strictly encourage users to automate KHL accounts, I have
  // not bothered to make a special exception for it.
  // /**
  //  * Route for:
  //  * - GET /payments/buy.json?video=m3u8
  //  */
  // buy() {
  //   return "/payments/buy.json?video=m3u8" as const;
  // }

  /**
   * Route for:
   * - POST /proxy_login.json
   */
  proxyLogin() {
    return "/proxy_login.json" as const;
  },

  /**
   * Route for:
   * - GET /purchases.json
   */
  purchases() {
    return "/purchases.json" as const;
  },

  /**
   * Route for:
   * - GET /register_for_push_notifications.json
   */
  registerForPushNotifications() {
    return "/register_for_push_notifications.json" as const;
  },

  /**
   * Route for:
   * - GET /register_for_push_notifications_on_favorite_teams.json
   */
  registerForFavoriteTeamsPushNotifications() {
    return "/register_for_push_notifications_on_favorite_teams.json" as const;
  },

  /**
   * Route for:
   * - GET /register.json
   */
  register() {
    return "/register.json" as const;
  },

  /**
   * Route for:
   * - GET /set_favorite_teams.json
   */
  setFavoriteTeams() {
    return "/set_favorite_teams.json" as const;
  },

  /**
   * Route for:
   * - GET /tables_v2.json
   */
  tables() {
    return "/tables_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /team_v2.json
   */
  team() {
    return "/team_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /teams_v2.json
   */
  teams() {
    return "/teams_v2.json" as const;
  },

  /**
   * Route for:
   * - GET /purchase.json
   */
  purchase() {
    return "/purchase.json" as const;
  },

  /**
   * Route for:
   * - GET /profile_update.json
   */
  profileUpdate() {
    return "/profile_update.json" as const;
  },

  /**
   * Route for:
   * - POST /android_notify.json (x-www-form-urlencoded)
   */
  androidNotify() {
    return "/android_notify.json" as const;
  },

  /**
   * Route for:
   * - GET /video.json
   */
  video() {
    return "/video.json" as const;
  },

  /**
   * Route for:
   * - GET /event_winner_vote.json
   */
  eventWinnerVote() {
    return "/event_winner_vote.json" as const;
  },

  /**
   * Route for:
   * - GET /event_winner_votes.json
   */
  eventWinnerVotes() {
    return "/event_winner_votes.json" as const;
  },
};
