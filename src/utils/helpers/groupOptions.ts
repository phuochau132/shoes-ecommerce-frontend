import { FormatVariantsType, ProductType } from '@/types/product';

export const groupedOptionsFc = (products: ProductType[]) => {
  const groupedOptions: FormatVariantsType = {};

  products.map((product) => {
    product.variants?.forEach((variant) => {
      variant.options?.forEach((optionsValue) => {
        const optionName = optionsValue.option.name;
        const optionValue = optionsValue.value;
        const valueId = optionsValue.id;

        // Nếu optionName chưa tồn tại, khởi tạo nó
        if (!groupedOptions[optionName]) {
          groupedOptions[optionName] = {
            name: optionName,
            values: [],
            type: optionsValue.option.type
          };
        }
        const isValueExist = groupedOptions[optionName].values.some(
          (item) => item.value === optionValue && item.id === valueId
        );

        if (!isValueExist) {
          groupedOptions[optionName].values.push({
            id: valueId,
            value: optionValue
          });
        }
      });
    });
  });

  return groupedOptions;
};
