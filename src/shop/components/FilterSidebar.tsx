import { useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Separator } from "../../components/ui/separator";

export const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSizes = searchParams.get('sizes')?.split(',') || []; // xs,l,xl. Si existe el arreglo se corta con una , para que aparezca en la url


  const handSizeChange = (size: string) => {
    // Se agrega una nueva talla. Si inclute una talla, la muestre y sino se agrega
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    // Si alguien agrega una talla, se regresa a la pagina 1
    searchParams.set('page', '1');
    // Se une la nueva talla y se separa por coma
    searchParams.set('sizes', newSizes.join(','));

    setSearchParams(searchParams);
  }

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size.id}
              // Cambiar el color del boton
              variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
              // variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handSizeChange(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup defaultValue="" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="priceAny" />
            <Label htmlFor="priceAny" className="text-sm cursor-pointer">Cualquier precio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="price1" />
            <Label htmlFor="price1" className="text-sm cursor-pointer">$0 - $50</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="price2" />
            <Label htmlFor="price2" className="text-sm cursor-pointer">$50 - $100</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="price3" />
            <Label htmlFor="price3" className="text-sm cursor-pointer">$100 - $200</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="price4" />
            <Label htmlFor="price4" className="text-sm cursor-pointer">$200+</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
