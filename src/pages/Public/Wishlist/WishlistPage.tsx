import styles from './wishlist.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CollectionType } from '@/types/collection';
import ProductCardComponent from '@/components/products/card';
import ProductBlockComponent from '@/components/products/productBlock';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';

const cx = bindClassNames(styles);
const sampleProducts: CollectionType = {
  title: 'Skincare',
  description: 'Optimal skincare with serums, creams, and masks for a radiant complexion.',
  products: [
    {
      id: 1,
      title: 'Classic Running Shoes',
      price: 99.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Comfortable and lightweight running shoes.',
      link: '/product/classic-running-shoes',
      vendor: 'Nike',
      variants: [
        {
          id: 1,
          name: 'Color',
          values: [
            {
              id: 54545454,
              price: 20,
              name: 'White'
            },
            {
              id: 123123123,
              price: 30,
              name: 'Red'
            }
          ],
          type: 'swatch'
        },
        {
          id: 2,
          name: 'Size',
          values: [
            {
              id: 1,
              price: 20,
              name: 'X'
            },
            {
              id: 2,
              price: 30,
              name: 'XL'
            }
          ],
          type: 'Rectangle'
        }
      ],
      reviews: []
    },
    {
      id: 2,
      title: 'Leather Loafers',
      price: 120.0,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-1_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-2_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks',
      variants: [
        {
          id: 1,
          name: 'Color',
          values: [
            {
              id: 54545454,
              price: 20,
              name: 'White'
            },
            {
              id: 123123123,
              price: 30,
              name: 'Red'
            }
          ],
          type: 'swatch'
        },
        {
          id: 2,
          name: 'Size',
          values: [
            {
              id: 1,
              price: 20,
              name: 'X'
            },
            {
              id: 2,
              price: 30,
              name: 'XL'
            }
          ],
          type: 'Rectangle'
        }
      ],
      reviews: []
    },
    {
      id: 3,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-12_2bc82ceb-f16e-42b2-97a1-44d767d1275c_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_7f3fb24f-a041-41c0-aa66-cd73f71a7cdc_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 4,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-9_772ea725-8e5f-4190-8ebc-604b18f41d3b_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_dfc1255d-7379-43a0-8ca2-54954ff8ca9b_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 5,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-6_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_b24edfdf-07ec-4e3a-b914-09ff3b48a316_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 6,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-17_f6e9a66a-791f-4cd0-80e6-41cb3b58d180_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-19_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    }
  ]
};
const WishlistPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Wishlist Product' }
        ],
        title: 'Wishlist Product',
        description: "Explore the items you've marked as favorites, ready to be added to your cart and enjoyed."
      })
    );
  }, []);
  return (
    <div className={cx('container mx-[auto]', 'wishlist-page')}>
      <div className={cx('page-content')}>
        <div className={cx('product-grid', 'mt-[40px] flex flex-wrap border-b border-dashed pb-[60px]')}>
          {sampleProducts.products?.map((product) => {
            return (
              <div className={cx('product', 'w-[100%] max-w-[25%] p-[10px] phone:max-w-[50%] tablet:max-w-[33%]')}>
                <ProductCardComponent removeWishListIcon={true} product={product} />
              </div>
            );
          })}
        </div>
        <div className={cx('section-recently-viewed')}>
          <ProductBlockComponent title="Recently Viewed" collection={sampleProducts}></ProductBlockComponent>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
