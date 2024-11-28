// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './announcement.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const messages = [
  { text: 'SUMMER SALE: UP TO 70% OFF SELECTED ITEMS', link: 'https://shopify.pxf.io/oq3WaO' },
  { text: 'WINTER COLLECTION NOW AVAILABLE!', link: 'https://shopify.pxf.io/oq3WaO' },
  { text: 'FREE SHIPPING ON ORDERS OVER $50', link: 'https://shopify.pxf.io/oq3WaO' }
];

const CartSidebar: React.FC = memo(() => {
  return (
    <div className="container py-[20px]">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false
        }}
        effect="fade"
        loop={true}
        pagination={false}
        navigation={false}
      >
        {messages.map((message, index) => (
          <SwiperSlide key={index}>
            <div className={cx('announcement-bar__message', 'text-red-500', 'text-sm', 'font-medium', 'uppercase')}>
              <div
                className={cx(
                  'message',
                  'italic',
                  'font-bold',
                  'pt-2.5',
                  'pb-2.5',
                  'flex',
                  'items-center',
                  'justify-center'
                )}
              >
                <a href={message.link} target="_blank" rel="noopener noreferrer">
                  {message.text}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default CartSidebar;
