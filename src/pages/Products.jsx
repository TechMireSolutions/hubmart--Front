import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 100;

    const currentCategory = searchParams.get('category') || '';

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const res = await api.get('/store/categories/');
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setCategories([]);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = '/store/products/';
                const params = new URLSearchParams();
                if (currentCategory) params.append('category__slug', currentCategory);
                if (searchQuery) params.append('search', searchQuery);

                const res = await api.get(`${url}?${params.toString()}`);
                const apiProducts = res.data.results || res.data;
                
                setProducts(apiProducts);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, searchQuery ? 300 : 0);

        return () => clearTimeout(delayDebounceFn);
    }, [currentCategory, searchQuery]);

    const handleCategoryClick = (slug) => {
        if (slug === currentCategory) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', slug);
        }
        setCurrentPage(1); // Reset to first page on category change
        setSearchParams(searchParams);
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="products-page container fade-in">
            <header className="page-header">
                <h1>Premium <span>Catalogue</span></h1>
                <p>Explore the finest British selection with real-time stock assurance.</p>
            </header>

            <div className="products-layout">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3 className="filter-title"><Filter size={18} /> Categories</h3>
                        <ul className="category-list">
                            <li
                                className={!currentCategory ? 'active' : ''}
                                onClick={() => { searchParams.delete('category'); setSearchParams(searchParams); }}
                            >
                                All Collections
                            </li>
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    className={currentCategory === cat.slug ? 'active' : ''}
                                    onClick={() => handleCategoryClick(cat.slug)}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="products-main">
                    <div className="toolbar glass">
                        <div className="search-box">
                            <SearchIcon size={20} />
                            <input
                                type="text"
                                placeholder="Find an artisanal gem..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="results-count">
                            Found <strong>{products.length}</strong> premium items
                        </div>
                    </div>

                    {loading ? (
                        <div className="loader">Synchronizing Ledger...</div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <h3>No items found matching your criteria.</h3>
                                        <p>Try adjusting your filters or search terms.</p>
                                    </div>
                                )}
                            </div>

                            {products.length > productsPerPage && (
                                <div className="pagination-premium glass">
                                    <button 
                                        onClick={() => paginate(currentPage - 1)} 
                                        disabled={currentPage === 1}
                                        className="pag-btn"
                                    >
                                        Prev
                                    </button>
                                    
                                    <div className="page-numbers">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button 
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => paginate(currentPage + 1)} 
                                        disabled={currentPage === totalPages}
                                        className="pag-btn"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
