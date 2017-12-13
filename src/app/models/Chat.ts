import { Avatar } from "./Avatar";
import { Post } from "./Post";

interface IChat {
    title: String;
    body: String;
    post: Post;
    owner: Avatar;
}

export class Chat implements IChat {
    constructor(public title: String, public body: String, public post: Post
        , public owner: Avatar) {
    }
}