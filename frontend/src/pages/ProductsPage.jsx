import React, {useState, useEffect} from 'react';
import ProductGrid from '../components/home/ProductGrid';
import Pagination from '../components/common/Pagination';
import productService from '../services/productService';
import {useParams} from 'react-router-dom';
import CategoriesSection from '../components/home/CategoriesSection';
import categories from '../data/categories.json';

const ProductsPage = ({type}) => {
    const {query} = useParams();
    const {categoryName} = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 12;
    const [products, setProducts] = useState([]);

    const filter = {
        page: currentPage,
        size: productsPerPage
    }

    const fetchAllProducts = async () => {
        try {
            const response = await productService.getAllProducts(filter);
            console.log(response);
            setProducts(response.content);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategoryProducts = async () => {
        try {
            const response = await productService.getProductsByCategory(categoryName, filter);
            setProducts(response.content);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const fetchSearchProducts = async () => {
        try {
            const response = await productService.searchProducts(query, filter);
            setProducts(response.content);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        // Reset page when type or query changes
        setCurrentPage(0);

        if (type === 'all') {
            fetchAllProducts();
        }
        if (type === 'category') {
            fetchCategoryProducts();
        }
        if (type === 'search') {
            fetchSearchProducts();
        }
    }, [currentPage, type, query, categoryName]);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber - 1); // Adjust for 0-based pagination
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className="min-h-screen w-full">
            <div className="flex">
                {/* Categories Sidebar */}
                {type !== 'search' && (
                    <div className=" bg-gray-50 p-4">
                        <CategoriesSection categories={categories} layout="vertical"/>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-grow">
                    <ProductGrid
                        title={type === 'search' ? `Search Results for "${query}"` : type === 'category' ? `Products in "${categoryName}"` : "All Products"}
                        products={products}
                        showViewAll={false}
                    />
                    <div className="py-8 bg-gray-100">
                        <Pagination
                            currentPage={currentPage + 1}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage; 