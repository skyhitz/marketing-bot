import pubsubPublisher from "../pubsub/pubsub-publisher";
import { forEachLimit } from "async";
import { tags } from "../consts/consts";

/**
 * Command to trigger this function:
 * gcloud beta pubsub topics publish queue-tags '{"action":"queueTags"}'
 */
class Tags {
  public queue(event: { data: { data: string } }, callback: Function) {
    const pubsubMessage = JSON.parse(
      Buffer.from(event.data.data, "base64").toString()
    );
    const { action } = pubsubMessage;
    if (action !== "queueTags") {
      console.warn("Unknown request");
      callback();
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
        return callback();
      }
    );
  }
}

const tagsFunction = new Tags();

export const queueTags = tagsFunction.queue.bind(tagsFunction);
