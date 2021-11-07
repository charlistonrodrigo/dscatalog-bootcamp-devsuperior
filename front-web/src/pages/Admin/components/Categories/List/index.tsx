
import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { Category } from 'core/types/Product';
import Card from 'pages/Admin/components/Products/Card';
import ProductCard from 'pages/Catalog/components/ProductCard';
import { Product } from 'core/types/Product';
import CardCategories from '../CardCategories' 
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, {  useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProductFilters from 'core/components/ProductFilters';

type Props = {
   //product: Product,
   onSearch: (filter: FilterForm) => void;
}
export type FilterForm = {
   name?: string;
   categoryId?: number;
}


const List = ({ onSearch }:Props) => {

   
   const [productsResponse, setProductsResponse] = useState<ProductsResponse>(); 
   const [isLoading, setIsLoading] = useState(false);
   //Quando o componente iniciar, buscar a lista de produtos.
   const [activePage, setActivePage] = useState(0);
   
   const [name, setName] = useState('');
   const [category, setCategory] = useState<Category>();
   
   const history = useHistory();

   const getProducts = useCallback((filter?: FilterForm) => {
      const params = {
         page: activePage,
         linesPerPage: 4,
         direction: 'DESC',
         orderBy: 'id',
         name: filter?.name,
         categoryId: filter?.categoryId,
      }
      // iniciar o loader
      setIsLoading(true);
      makeRequest({ url: '/products', params })
         .then(response => setProductsResponse(response.data))
         .finally(() => {
         // finalizar o loader
         setIsLoading(false);
         })
   }, [activePage])

   useEffect(() =>{
      getProducts();
   }, [getProducts]);

   const handleCreate = () => {
      history.push('/admin/products/create');
   }

   const handleChangeName = (name: string) => {
      //setActivePage(0);
      onSearch({ name });
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
            <div className="catalog-products-list">
              
            {isLoading ? "" : (
                 productsResponse?.content.map(product => (
                  <Link to={`/products/${product.id}`} key={product.id}>
                       <CardCategories product={product} key={product.id} onRemove={onRemove} />
                  </Link>     
              ))
             )}
           
             {productsResponse && (
               <Pagination  
                  totalPages={productsResponse.totalPages}
                  activePage={activePage}
                  onChange={page => setActivePage(page)}
               />
            )}
          </div>
      </div>  
     
     
   )
}

export default List;
