import { FormatVariantsType, ProductType } from '@/types/product';

export const groupedOptionsFc = (products: ProductType[]) => {
  const groupedOptions: FormatVariantsType = {};
  products.map((product) => {
    product.variants?.forEach((variant) => {
      variant.options?.forEach((optionsValue) => {
        const optionName = optionsValue.option.name;
        const optionValue = optionsValue.value;
        const valueId = optionsValue.id;
        if (!groupedOptions[optionName]) {
          groupedOptions[optionName] = { name: optionName, values: [], type: optionsValue.option.type };
        }
        groupedOptions[optionName].values.push({
          id: valueId,
          value: optionValue
        });
      });
    });
  });
  return groupedOptions;
};
