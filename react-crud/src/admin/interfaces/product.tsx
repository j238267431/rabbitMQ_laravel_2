import {Tag} from '../interfaces/tag';
export interface Product {
   id: number;
   title: string;
   tags: Tag;
   image: string;
   likes: number;
}