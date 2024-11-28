import styles from './collection.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper'; // Import Swiper type
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';

const sampleProducts: Collection = {
  products: [
    {
      title: 'Classic Running Shoes',
      price: 99.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Comfortable and lightweight running shoes.',
      link: '/product/classic-running-shoes',
      vendor: 'Nike'
    },
    {
      title: 'Leather Loafers',
      price: 120.0,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    }
  ]
};
const product: Product = {
  title: 'Classic Running Shoes',
  price: 99.99,
  images: [
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg',
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
  ]
};

const CollectionPage = () => {
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);
  return <div className={cx('container', 'collection-page')}>hautest123</div>;
};

export default CollectionPage;
