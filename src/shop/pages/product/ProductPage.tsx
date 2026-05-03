import { useParams } from "react-router"; // tu hook
import { CustomFullScreenLoading } from "../../../components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "../../../lib/currency-formatter";
import { useProduct } from "../../../admin/hooks/useProduct";
import { useEffect, useState } from "react";

export const ProductPage = () => {

  const { idSlug } = useParams();

  const { data: product, isLoading } = useProduct(idSlug!);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (product?.images.length) {
      setMainImage(product.images[0]);
    };
  }, [product]);


  if (isLoading) return <CustomFullScreenLoading />;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* 🖼️ Imágenes */}
        <div>
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md border
                  cursor-pointer transition hover:scale-105
                  ${mainImage === img ? "border-black ring-2 ring-black" : "border-gray-200"}`}
              />
            ))}
          </div>
        </div>

        {/* 📄 Info */}
        <div className="space-y-6">

          {/* Título */}
          <h1 className="text-3xl font-bold text-slate-800">
            {product.title}
          </h1>

          {/* Precio */}
          <p className="text-2xl font-semibold text-green-600">
            {currencyFormatter(product.price)}
          </p>

          {/* Estado */}
          <p className={`text-sm font-medium ${product.stock > 5
            ? "text-green-600"
            : product.stock > 0
              ? "text-yellow-600"
              : "text-red-600"
            }`}>
            {product.stock > 5
              ? "En stock"
              : product.stock > 0
                ? "Bajo stock"
                : "Sin stock"}
          </p>

          {/* Descripción */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Descripción</h2>
            <p className="text-slate-600">{product.description}</p>
          </div>

          {/* Tallas */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Tallas</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <span
                  key={size}
                  className="px-3 py-1 bg-slate-200 rounded-full text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Etiquetas</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Botón */}
          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Agregar al carrito
          </button>

        </div>
      </div>
    </div>
  );
};