import { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import PostCard from './PostCard';
import CategoryFilter from './CategoryFilter';

const POSTS_PER_PAGE = 10;

const PostList = () => {
  // Base state management
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter and pagination state
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Store category NAMES
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        // console.log('Data received:', data);
        // console.log('Number of posts:', data.posts?.length);
        // console.log('First post:', data.posts?.[0]);
        // console.log('Categories of first post:', data.posts?.[0]?.categories);
        setPosts(data.posts);
        setFilteredPosts(data.posts);
        
        // Extract all unique categories (deduplicate by NAME)
        const categoriesMap = new Map<string, Category>();

        
        data.posts.forEach((post: Post) => {
          post.categories.forEach((category: Category) => {
            // Use NAME as key to avoid duplicates
            if (!categoriesMap.has(category.name)) {
              categoriesMap.set(category.name, category);
            }
          });
        });
        
        const uniqueCategories = Array.from(categoriesMap.values())
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
        
        // console.log('Total categories found:', totalCategoriesFound);
        // console.log('Unique categories:', uniqueCategories.length);
        // console.log('Category names:', uniqueCategories.map(c => c.name));
        setAllCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by categories (AND logic - all selected categories must be present)
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => {
        // Check if post contains ALL selected categories
        return selectedCategories.every(selectedCategory => 
          post.categories.some(postCategory => 
            postCategory.name === selectedCategory
          )
        );
      });
      
      // console.log('Selected categories (names):', selectedCategories);
      // console.log('Filtered posts:', filtered.length, 'out of', posts.length);
      setFilteredPosts(filtered);
    }
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [posts, selectedCategories]);

  // Handle category selection change (uses NAMES now)
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)  // Deselect
        : [...prev, categoryName]                      // Select
    );
  };

  // Calculate posts for current page
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-list-container">
      {/* Sidebar with filters */}
      <aside className="sidebar">
        <CategoryFilter
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </aside>

      {/* Main content area */}
      <main className="main-content">
        {/* Results information */}
        <div className="results-info">
          <h2>
            Articles ({filteredPosts.length})
            {selectedCategories.length > 0 && ' - Filtered'}
          </h2>
        </div>

        {/* Posts grid */}
        <div className="posts-grid">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="no-results">
            <p>No articles found with these filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PostList;