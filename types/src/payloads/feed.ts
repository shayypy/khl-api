export enum FeedItemType {
  Photogallery = "Photogallery",
  Video = "Event",
  News = "News",
  Tweet = "Tweet",
  Vk = "Vk",
  Instagram = "Instagram",
  Rss = "Rss",
}

export interface APIFeedItem {
  type: FeedItemType;
  id: number;
  date: number;
  title: string;
  image: string | null;
  body: string;
  body_w_media: string;
  outer_url: string;
}
