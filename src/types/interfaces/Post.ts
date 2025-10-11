import { Author } from './Author';
import { Category } from './Category';

// Interface to represent a blog post
export interface Post {
  id: string;            // Unique identifier for the post
  title: string;         // Post title
  publishDate: string;   // Publication date (ISO string format)
  author: Author;        // Post author information
  summary: string;       // Post summary/excerpt
  categories: Category[]; // Array of categories associated with the post
}