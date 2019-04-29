
import { Payload } from './payload.model';

export class PostPayload extends Payload {
  image?: string;
  description?: string;
  id?: string;
}

export class Post extends PostPayload {
  constructor(payload: PostPayload) {
    super(payload);
  }
}