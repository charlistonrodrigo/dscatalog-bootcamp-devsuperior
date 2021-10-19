import React,{  useState, useEffect} from 'react';
import ProductPrice from 'core/components/ProductPrice';
import Catalog from 'pages/Catalog'
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { Product } from 'core/types/Product';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import { Category, ProductsResponse } from 'core/types/Product';
import { Link } from 'react-router-dom';
import './styles.scss';
/*
const [isLoadingCategories, setIsLoadingCategories] = useState(false);
const [categories, setCategories] = useState<Category[]>([]);
*/
type Props = {
    product: Product,
    onRemove: (productId: number) => void,
}
/*
useEffect(() => {
    setIsLoadingCategories(true); 
    makeRequest({ url: `/categories`})
       .then(response => setCategories(response.data.content))
       .finally(() => setIsLoadingCategories(false));
}, []);
*/
const CardCategories = ({ product, onRemove }: Props) => {
    return (
        <div className="card-base product-card-admin">    
                <div className="text-center border-right py-3 border-img">
                    
                </div>
                <div className="card-content-list">
                    {/*
                    <h3 className="product-card-name-admin">
                        {product.name}
                    </h3>
                    */}
                    <div>
                        {product.categories.map(category => (
                            <span className="badge badge-secondary mr-2-list">
                                {category.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="buttons-container-card">
                   <Link 
                       to={`/admin/products/${product.id}`} 
                       type="button"
                       className="btn btn-outline-secondary btn-block border-radius-10 btn-list"
                   >
                       <h1 className="btn-list">EDITAR</h1>
                   </Link>
                   <span className="span-list"></span>
                   <button 
                       type="button"
                       className="btn btn-outline-danger btn-block border-radius-10 btn-list"
                       onClick={() => onRemove(product.id)}
                   >
                       EXCLUIR
                   </button>
                </div>        
        </div>
    )
}

export default CardCategories;