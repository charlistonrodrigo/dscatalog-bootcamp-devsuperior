/*
import React from 'react';
import  List, { FilterForm} from './List';
import Form from '../Products/Form';
import { Route, Switch } from 'react-router-dom';
import { Product } from 'core/types/Product';
import getProducts from './CardCategories';
import ProductFilters from 'core/components/ProductFilters';

const Categories = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/categories" exact>
                  
               </Route>
               
           </Switch>
       </div>
    );
}

export default Categories; 
*/
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { makePrivateRequest } from 'core/utils/request';
import ProductCard from '../../../Catalog/components/ProductCard';
//import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Card from '../Products/Card';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import { useHistory } from 'react-router-dom';

const Categories = () =>{
//Quando a lista de produtos estiver disponivel, 
//popular um estado no componente, e listar os produtos dinâmicamente.
const [productsResponse, setProductsResponse] = useState<ProductsResponse>(); 
const [isLoading, setIsLoading] = useState(false);
//Quando o componente iniciar, buscar a lista de produtos.
const [activePage, setActivePage] = useState(0);
const [name, setName] = useState('');
const [category, setCategory] = useState<Category>();
const history = useHistory();

const getProducts = useCallback(() => {
    const params = {
        page: activePage,
        linesPerPage: 4,
        name,
        categoryId: category?.id
    }
    // iniciar o loader
    setIsLoading(true);
    makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data))
        .finally(() => {
        // finalizar o loader
        setIsLoading(false);
        })
}, [activePage, name, category]);

useEffect(() =>{
    getProducts();
}, [getProducts]);

const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
 }

 const handleChangeCategory = (category: Category) => {
    setActivePage(0);
    setCategory(category);
 }

 const clearFilters = () => {
    setActivePage(0);
    setCategory(undefined);
    setName('');
 }

 const handleCreate = () => {
    history.push('/admin/products/create');
 }

 const onRemove = (productId: number) => {
    const confirm = window.confirm('Deseja realmente excluir este produto?');

    if (confirm) {
       makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE',})
          .then(() => {
             toast.info('Produto removido com sucesso!');
             getProducts();
          })   
          .catch(() => {
                toast.error('Erro ao remover produto!');
          }) 
    }
 }
    return (
        <div className="catalog-container">
            <div className="filter-container">
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
                </button>
                
                <ProductFilters 
                   name={name}
                   category={category}
                   handleChangeCategory={handleChangeCategory}
                   handleChangeName={handleChangeName} 
                   clearFilters={clearFilters}
                />
                
            </div>
            <div className="admin-list-container">
             { isLoading ? ""  : (
                productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        
                        <Card product={product} key={product.id} onRemove={onRemove} />
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

export default Categories;
