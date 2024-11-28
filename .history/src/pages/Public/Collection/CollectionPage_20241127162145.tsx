import styles from './collection.module.scss';
import { Collection } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarComponent from './component/sidebar';
import BreadcrumbComponent from '@/components/commons/breadcrumb';

const cx = bindClassNames(styles);
const sampleProducts: Collection = {
  title: 'Skincare',
  description: 'Optimal skincare with serums, creams, and masks for a radiant complexion.',
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
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-1_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-2_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-12_2bc82ceb-f16e-42b2-97a1-44d767d1275c_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_7f3fb24f-a041-41c0-aa66-cd73f71a7cdc_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-9_772ea725-8e5f-4190-8ebc-604b18f41d3b_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_dfc1255d-7379-43a0-8ca2-54954ff8ca9b_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-6_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_b24edfdf-07ec-4e3a-b914-09ff3b48a316_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-17_f6e9a66a-791f-4cd0-80e6-41cb3b58d180_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-19_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    }
  ]
};

const CollectionPage = () => {
  return (
    <div className={cx('container', 'collection-page')}>
      <div className={cx('collection-heading', 'mb-[50px] pt-[40px]')}>
        <div className={cx('breadcrumb', 'flex justify-center')}>
          <BreadcrumbComponent
            path={[
              { link: '#', title: 'Home' },
              { link: '#', title: 'Collection' },
              { link: '#', title: sampleProducts.title }
            ]}
          />
        </div>
        <h1 className={cx('title', 'mb:text-[30px] text-center text-[35px] font-[700]')}>{sampleProducts.title}</h1>
        <p className={cx('description', 'text-center text-[15px] font-[500] text-[bold]')}>
          <span className={cx('text')}>{sampleProducts.description}</span>
        </p>
      </div>
      <div className={cx('collection-content', 'flex')}>
        <div className={cx('collection__content-sidebar')}>
          <SidebarComponent />
        </div>
        <div className={cx('collection__content-grid', 'pl-[50px]')}>
          <div className={cx('toolbar', 'flex')}>
            <div className={cx('result')}>
              <span className="text">There are 18 results in total</span>
            </div>
            <div className={cx('grid-mode', 'flex gap-[10px]')}>
              <div className={cx('grid_mode-item')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                  <g fill="currentColor">
                    <path d="M11.073 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.07 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM11.073 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.927 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  </g>
                </svg>
              </div>
              <div className={cx('grid_mode-item')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                  <g fill="currentColor">
                    <path d="M2.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </g>
                </svg>
              </div>
              <div className={cx('grid_mode-item')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="none">
                  <g fill="currentColor">
                    <path d="M2.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.073 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.073 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.073 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className={cx('product-grid')}></div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
