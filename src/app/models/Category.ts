import { Topic } from './Topic';

export class Category {
    id:number;
    name:string;
    points?:number;
    topics?:Topic[];
}