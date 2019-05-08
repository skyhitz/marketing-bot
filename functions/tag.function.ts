import { tagUrl } from '../consts/consts';
import fetch from 'node-fetch';

/**
 * Tag function
 */
class Tag {
  public maxPerPage = 5;

  public async process(event: { data: string }) {
    const pubsubMessage = JSON.parse(
      Buffer.from(event.data, 'base64').toString()
    );
    const { action, tag } = pubsubMessage;

    if (action !== 'processTag') {
      console.warn('Unknown request');
      return;
    }

    const res = await fetch(tagUrl(tag));
    const data = res.json();
    console.log(data);
  }
}

const tag = new Tag();

/**
 * Export function for google cloud
 */
export const processTag = tag.process.bind(tag);
