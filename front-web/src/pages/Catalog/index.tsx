import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';

const Catalog = () =>{
//Quando a lista de produtos estiver disponivel, 
//popular um estado no componente, e listar os produtos dinâmicamente.
const [productsResponse, setProductsResponse] = useState<ProductsResponse>(); 
const [isLoading, setIsLoading] = useState(false);
//Quando o componente iniciar, buscar a lista de produtos.
const [activePage, setActivePage] = useState(0);

const getProducts = useCallback((filter?: FilterForm) => {
    const params = {
        page: activePage,
        linesPerPage: 12,
        name: filter?.name,
        categoryId: filter?.categoryId
    }
    // iniciar o loader
    setIsLoading(true);
    makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data))
        .finally(() => {
        // finalizar o loader
        setIsLoading(false);
        })
}, [activePage]);

useEffect(() =>{
    getProducts();
}, [getProducts]);

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">
                    Catálogo de produtos
                </h1>
                <ProductFilters onSearch={filter => getProducts(filter)}/>
            </div>
            <div className="catalog-products">
             { isLoading ? <ProductCardLoader /> : (
                productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product}/>
                    </Link>
               ))
             )}
                       
            </div>
            {productsResponse && (
               <Pagination  
                  totalPages={productsResponse.totalPages}
                  activePage={activePage}
                  onChange={page => setActivePage(page)}
               />
            )}
        </div>
     );
}

export default Catalog;
