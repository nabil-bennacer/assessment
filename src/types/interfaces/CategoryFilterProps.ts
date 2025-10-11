import { Category } from './Category';

// Props interface for the CategoryFilter component
export interface CategoryFilterProps {
  categories: Category[];                           // All available categories
  selectedCategories: string[];                    // Array of selected category names
  onCategoryChange: (categoryName: string) => void; // Callback when category selection changes
}