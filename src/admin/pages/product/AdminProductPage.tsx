// https://github.com/Klerith/bolt-product-editor


import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '../../hooks/useProduct';
import { CustomFullScreenLoading } from '../../../components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '../../../interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Para obtener el producto por id
  const { data: product, isLoading, isError, productMutation } = useProduct(id || '');

  // console.log({ product, isLoading, isError });

  // Asegurar la compatibilidad de las peticiones
  const handleSubmit = async (productLike: Partial<Product>) => {
    await productMutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-right',
          richColors: true
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log('Error: ', error);

        toast.error('Error al actualizar el producto');
      }
    });
  }


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
    onSubmit={handleSubmit}
  />

};