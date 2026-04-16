import React from 'react'
import { CustomPagination } from '../../../components/custom/CustomPagination'
import { products } from '../../../mocks/products.mock'
import { CustomJumbotron } from '../../components/CustomJumbotron'
import { ProductsGrid } from '../../components/ProductsGrid'
import { useParams } from 'react-router'

export const GenderPage = () => {
  const { gender } = useParams();
  console.log(gender);

  const genderLabel = gender === 'men' ? 'Hombres' :
    gender === 'women' ? 'Mujeres' : 'Niños';

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5} />
    </>
  )
}
