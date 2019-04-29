export type PubsubAction = 'queueTags' | 'processTag';

export type PubsubMessage = {
  action: PubsubAction,
  tag?: string,
};

export type PubsubMessageData = {
  data: PubsubMessage
};