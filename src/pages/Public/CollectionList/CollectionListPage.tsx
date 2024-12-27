import BreadcrumbComponent from '@/components/commons/breadcrumb';
import styles from './collectionList.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CollectionType } from '@/types/collection';
import { ButtonComponent } from '@/components/commons';
import { useEffect } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useDispatch } from 'react-redux';

const cx = bindClassNames(styles);
const collections: CollectionType[] = [
  {
    title: 'Sweaters',
    image: 'https://glozin-demo.myshopify.com/cdn/shop/collections/img_3.jpg',
    link: '/collections/sweaters',
    products: []
  },
  {
    title: 'T-Shirts',
    image: 'https://glozin-demo.myshopify.com/cdn/shop/collections/img_4.jpg',
    link: '/collections/t-shirts',
    products: []
  },
  {
    title: 'Jackets',
    image: 'https://glozin-demo.myshopify.com/cdn/shop/collections/img_5.jpg',
    link: '/collections/jackets',
    products: []
  },
  {
    title: 'Hoodies',
    image: 'https://glozin-demo.myshopify.com/cdn/shop/collections/img_6.jpg',
    link: '/collections/hoodies',
    products: []
  },
  {
    title: 'Accessories',
    image: 'https://glozin-demo.myshopify.com/cdn/shop/collections/img_9.jpg',
    link: '/collections/accessories',
    products: []
  }
];

const CollectionListPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Collections List' }
        ],
        title: 'Collections List',
        description:
          'Explore our thoughtfully curated collections: Sweaters, Handbags, Denim, and more—each perfect for enhancing every style on every special occasion and daily wear.'
      })
    );
  }, []);
  const renderCollectionItem = () => {
    return collections.map((collection, index) => {
      return (
        <div
          key={index}
          className={cx('collection-item', 'group w-1/4 overflow-hidden p-[10px] phone:w-[50%] tablet:w-[33%]')}
        >
          <div className="relative">
            <a className={cx('pb-full relative block overflow-hidden rounded-[10px]')} href={collection.link}>
              <img
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                src={collection.image}
                alt={`${collection.title} image`}
              />
            </a>
            <button
              className={cx(
                'collection-action',
                'absolute bottom-0 bottom-[10%] left-1/2 min-w-[150px] -translate-x-1/2 transform rounded-[5px] bg-white px-[2.5rem] py-[1.5rem] text-black'
              )}
            >
              {collection.title}
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cx('collectionList-page')}>
      <div className={cx('page-content', 'flex flex-wrap')}>{renderCollectionItem()}</div>
      <div className={cx('showMore-btn', 'flex justify-center')}>
        <ButtonComponent className={cx('max-w-[200px] rounded-[10px]')}>Show more</ButtonComponent>
      </div>
    </div>
  );
};

export default CollectionListPage;
