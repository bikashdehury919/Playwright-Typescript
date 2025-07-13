// ProductPageLocators.ts
export const ProductPageLocators = {
  PRODUCT_NAME: 'h1.page-title span.base',
  ADD_TO_CART_BUTTON: 'button#product-addtocart-button',
  SUCCESS_MESSAGE: 'div.message-success',
  MINI_CART_ICON: 'a.action.showcart',
  CHECKOUT_BUTTON: 'button#top-cart-btn-checkout',
  QUANTITY_INPUT: 'input#qty',
  PRODUCT_LINKS: 'li.product-item a.product-item-link',
  FILTER_SECTION: 'div.filter-options-item',
  FILTER_TITLE: 'div.filter-options-title',

  sizeSelector: (size: string) => `div.swatch-option.text[option-label="${size}"]`,
  colorSelector: (color: string) => `div.swatch-option.color[option-label="${color}"]`,
  filterSectionWithText: (filterName: string) =>
    `div.filter-options-item:has-text("${filterName}")`,
  filterOption: (filterName: string, optionText: string) =>
    `div.filter-options-item:has-text("${filterName}") a:has-text("${optionText}")`,
  swatchColorOption: (optionText: string) =>
    `a[aria-label="${optionText}"] div.swatch-option.color`,
  swatchSizeOption: (optionText: string) =>
    `a[aria-label="${optionText}"] div.swatch-option.text`,
};
