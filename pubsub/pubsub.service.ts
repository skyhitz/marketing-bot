import { GCLOUD_PROJECT } from '../consts/consts';

const Pubsub = require('@google-cloud/pubsub');
const pubsub = Pubsub({
  projectId: GCLOUD_PROJECT,
});
import { PubsubMessage } from './pubsub.types';

class PubSubService {
  constructor() {}

  createOrGetTopic(topicName: string) {
    return new Promise((resolve, reject) => {
      pubsub.createTopic(topicName, (err: any, topic: any) => {
        // topic already exists.
        if (err && err.code === 6) {
          resolve(pubsub.topic(topicName));
          return;
        }
        resolve(topic);
      });
    });
  }

  queueMessage(topicName: string, message: PubsubMessage) {
    return new Promise((resolve, reject) => {
      let topic = pubsub.topic(topicName);
      if (!topic) {
        return;
      }
      let publisher = topic.publisher();
      let data = Buffer.from(JSON.stringify(message));

      publisher.publish(data, (err: any) => {
        if (err) {
          console.error('Error occurred while queuing background task', err);
          reject(err);
        } else {
          let resolveMessage = `${
            message.action
          } queued for background processing`;
          resolve(resolveMessage);
        }
      });
    });
  }
}

export const pubSubService = new PubSubService();
