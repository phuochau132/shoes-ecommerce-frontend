import { ImageComponent } from '@/components/commons';
import styles from './home.module.scss';
import ProductBlockComponent from '@/components/products/productBlock';
import { bindClassNames } from '@/utils/helpers/cx';
import { useEffect } from 'react';
import { Currency } from '@/utils/helpers/currenciesFormat';
import { paths } from '@/routes/paths';

const cx = bindClassNames(styles);

const HomePage = () => {
  useEffect(() => {
    Currency.initializeCurrency();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('slide-show')}>
        <ImageComponent
          link={paths.collection.newIn}
          src="https://res.cloudinary.com/dvgjegefi/image/upload/v1738928067/home-shoes-slider-01_xayjjv.webp"
        />
      </div>
      <section className={cx('section-image-banner', 'flex gap-[27px]')}>
        <div className={cx('image__banner-item', 'larger-banner', 'w-[50%]')}>
          <div className={cx('image-box')}>
            <ImageComponent
              link={paths.collection.man}
              aspect_ratio="82.75862068965517%"
              src="https://res.cloudinary.com/dvgjegefi/image/upload/v1738928066/banner-image-1_870x_y6xqfq.webp"
            />
          </div>
        </div>
        <div className={cx('image__banner-item', 'small-banner', 'flex w-[50%] flex-col justify-between')}>
          <div className={cx('row')}>
            <div className={cx('image-box', 'w-full')}>
              <ImageComponent
                link={paths.collection.newIn}
                src="https://res.cloudinary.com/dvgjegefi/image/upload/v1738928066/banner-image-2_870x_ysaoj9.webp"
              />
            </div>
          </div>

          <div className={cx('row flex gap-[20px] pt-[10px]')}>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  link={paths.collection.bestSeller}
                  aspect_ratio="82%"
                  src="https://res.cloudinary.com/dvgjegefi/image/upload/v1738928066/banner-image-3_420x_wnlir0.webp"
                />
              </div>
            </div>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  link={paths.collection.woman}
                  aspect_ratio="82%"
                  src="https://res.cloudinary.com/dvgjegefi/image/upload/v1738928049/banner-image-4_420x_ufrauc.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductBlockComponent
        viewAllButton={true}
        title="New Arrivals"
        layout="grid"
        collectionHandle="new-in"
      ></ProductBlockComponent>
      <div className="line"></div>
      <ProductBlockComponent
        viewAllButton={true}
        title="Best Sellers"
        collectionHandle="best-sellers"
      ></ProductBlockComponent>
    </div>
  );
};

export default HomePage;
