import { Avatar } from "./Avatar";
import { Post } from "./Post";

interface IChat {
    _id: String;
    title: String;
    body: String;
    post: [Post];
    owner: String;
    
}

export class Chat implements IChat {
    constructor(public _id: String, public title: String, public body: String, public post: [Post]
        , public owner: String) {
    }
}