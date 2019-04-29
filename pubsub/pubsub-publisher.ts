import { pubSubService } from '../pubsub/pubsub.service';
import { PubsubTopics } from '../pubsub/pubsub.topics';

/**
 * Pubsub publisher sends all possible messages to pubsub
 */
class PubsubPublisher {
  constructor() { }

  async queueTags() {
    await pubSubService.queueMessage(PubsubTopics.queueTags, {
      action: 'queueTags',
    });
  }

  async processTag(tag: string) {
    await pubSubService.queueMessage(PubsubTopics.processTag, {
      action: 'processTag',
      tag: tag
    });
  }

}

const pubsubPublisher = new PubsubPublisher();

export default pubsubPublisher;
