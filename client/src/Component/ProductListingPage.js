import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You need to log in to view products.');
                return;
            }

            try {
                const response = await axios.get(process.env.REACT_APP_PRODUCT_LIST, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);


    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase().trim())
    );


    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 left-0 py-2 px-8 bg-white shadow-md mt-0 z-1 position-fixed">
                <div className="flex justify-end">
                    <div className="w-full flex">
                        <input
                            type="text"
                            placeholder="Search products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-2 sm:py-8 lg:px-2 sm:mt-64 md:mt-64" style={{ marginTop: '650px' }}>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products List</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <div key={product.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            alt={product.title}
                                            src={product.thumbnail}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex flex-col">
                                        <h3 className="text-sm text-gray-700">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                        <p className="mt-2 text-sm font-medium text-gray-900">{product.price} USD</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-products text-center text-gray-500">No products found</p>
                        )}
                    </div>

                    <div className="pagination mt-6 flex justify-between">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={paginatedProducts.length < itemsPerPage}
                            className="pagination-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductListingPage;

