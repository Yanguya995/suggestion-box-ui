
export interface IPost{
    avatar: String;
    chat: String;
    body: String;    
}
export class Post implements IPost {
    createdDate: Date;
    likes: Number;
    tags: [String];
    constructor(public chat: String, public avatar: String
    ,public body: String) {}
}