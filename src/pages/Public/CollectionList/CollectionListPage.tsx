import styles from './collectionList.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CollectionType } from '@/types/collection';
import { ButtonComponent } from '@/components/commons';
import { useEffect, useState } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useDispatch } from 'react-redux';
import { useGetAllMutation } from '@/apis/collection/collection.api';
import LoaderComponent from '@/components/commons/loader';

const cx = bindClassNames(styles);

const CollectionListPage: React.FC = () => {
  const dispatch = useDispatch();
  const [fetchAllCollections, { isLoading, isSuccess }] = useGetAllMutation();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const getAllCollections = async () => {
    try {
      const response = await fetchAllCollections().unwrap();
      setCollections(response.data.collections);
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Collections List' }
        ],
        title: 'Collections List',
        description:
          'Explore our thoughtfully curated collections: New In, Best Sellers, Woman, and more—each perfect for enhancing every style on every special occasion and daily wear.'
      })
    );
    getAllCollections();
  }, []);
  const renderCollectionItem = () => {
    return collections.map((collection, index) => {
      return (
        <div
          key={index}
          className={cx('collection-item', 'group w-1/4 overflow-hidden p-[10px] phone:w-[50%] tablet:w-[33%]')}
        >
          <div className="relative">
            <a
              className={cx('pb-full relative block overflow-hidden rounded-[10px]')}
              href={`/collections/${collection.handle}`}
            >
              <img
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                src={collection.image}
                alt={`${collection.name} image`}
              />
            </a>
            <button
              className={cx(
                'collection-action',
                'absolute bottom-0 bottom-[10%] left-1/2 min-w-[150px] -translate-x-1/2 transform rounded-[5px] bg-white px-[2.5rem] py-[1.5rem] text-black'
              )}
            >
              {collection.name}
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cx('collectionList-page', 'relative')}>
      <>
        <div className={cx('page-content', 'flex flex-wrap')}>
          {isLoading ? <LoaderComponent /> : renderCollectionItem()}
        </div>
        <div className={cx('showMore-btn', 'flex justify-center')}>
          <ButtonComponent className={cx('max-w-[200px] rounded-[10px]')}>Show more</ButtonComponent>
        </div>
      </>
    </div>
  );
};

export default CollectionListPage;
