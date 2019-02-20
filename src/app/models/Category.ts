import { Topic } from './Topic';

export class Category {
    id:number;
    name:string;
    points?:number;
    colour?:string;
    topics?:Topic[];
}