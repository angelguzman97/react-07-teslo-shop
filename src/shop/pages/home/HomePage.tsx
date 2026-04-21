import { CustomPagination } from "../../../components/custom/CustomPagination"
import { products } from "../../../mocks/products.mock"
import { CustomJumbotron } from "../../components/CustomJumbotron"
import { ProductsGrid } from "../../components/ProductsGrid"
import { useProducts } from "../../hooks/useProducts"

export const HomePage = () => {

  // Se trae el hook para mostrar los productos
  const { data } = useProducts();

console.log(data);


  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5} />
    </>
  )
}
