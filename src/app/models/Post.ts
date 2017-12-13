import { Avatar } from './Avatar';
import { Chat } from './Chat';

export class Post {
    avatar: Avatar;
    chat: Chat;
    createdDate: Date;
    body: String
    likes: Number;
    tags: [String];
    constructor() {}
}