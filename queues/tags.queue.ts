import pubsubPublisher from '../pubsub/pubsub-publisher';
import { forEachLimit } from 'async';
import { tags } from '../consts/consts';

/**
 * Command to trigger this function:
 * gcloud beta pubsub topics publish queue-tags '{"action":"queueTags"}'
 */
class Tags {
  public queue(event: { data: string }) {
    console.log('event queue', event);
    const pubsubMessage = JSON.parse(
      Buffer.from(event.data, 'base64').toString()
    );
    const { action } = pubsubMessage;
    if (action !== 'queueTags') {
      console.warn('Unknown request');
      return;
    }

    forEachLimit(
      tags,
      1,
      async (tag, callback) => {
        await pubsubPublisher.processTag(tag);
        callback();
      },
      err => {
        if (err) {
          return console.log(err);
        }
        return;
      }
    );
  }
}

const tagsFunction = new Tags();

export const queueTags = tagsFunction.queue.bind(tagsFunction);
