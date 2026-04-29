// https://github.com/Klerith/bolt-product-editor


import { Navigate, useParams } from 'react-router';
import { useProduct } from '../../hooks/useProduct';
import { CustomFullScreenLoading } from '../../../components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
}

export const AdminProductPage = () => {
  const { id } = useParams();

  // Para obtener el producto por id
  const { data: product, isLoading, isError, handleSubmitForm } = useProduct(id || '');

  // console.log({ product, isLoading, isError });


  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  // Redirección
  if (isError) {
    return <Navigate to='/admin/products' />
  }

  if (isLoading) {
    return <CustomFullScreenLoading />
  }

  // No se puso junto con el de error, porque primero hay que verificar que no hay error o que esta cargando
  if (!product) {
    return <Navigate to='/admin/products' />
  }

  return <ProductForm
    title={title}
    subtitle={subtitle}
    product={product}
    onSubmit={handleSubmitForm}
  />

};