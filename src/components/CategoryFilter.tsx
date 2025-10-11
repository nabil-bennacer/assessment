import React from 'react';
import { CategoryFilterProps } from '../types';

// Category filter component - handles category selection with checkboxes
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange
}) => {
  return (
    <section className="category-filter" role="search" aria-label="Filter articles by category">
      <header className="filter-header">
        <h2>Filter by category</h2>
        <span className="category-count">({categories.length} categories available)</span>
      </header>
      
      {categories.length === 0 ? (
        <p className="no-categories">No categories found...</p>
      ) : (
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={`${category.name}-${index}`} className="category-item">
              <label className="category-label" htmlFor={`category-${index}`}>
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onCategoryChange(category.name)}
                  className="category-checkbox"
                />
                <span className="checkbox-custom"></span>
                <span className="category-text">{category.name}</span>
              </label>
            </div>
          ))}
        </div>
      )}
      
      {/* Clear filters button - only shown when filters are active */}
      {selectedCategories.length > 0 && (
        <footer className="filter-actions">
          <button 
            onClick={() => {
              selectedCategories.forEach(categoryName => onCategoryChange(categoryName));
            }}
            className="clear-filters-btn"
            aria-label={`Clear ${selectedCategories.length} selected filters`}
          >
            Clear filters ({selectedCategories.length})
          </button>
          <div className="selected-info">
            <small>{selectedCategories.length} categor{selectedCategories.length > 1 ? 'ies' : 'y'} selected</small>
          </div>
        </footer>
      )}
    </section>
  );
};

export default CategoryFilter;