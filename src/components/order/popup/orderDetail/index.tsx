import React, { memo, CSSProperties, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableProps } from 'antd';
import { LinkIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

import styles from './orderDetail.module.scss';
import { OrderItemType } from '@/types/order';
import { Currency } from '@/utils/helpers/currenciesFormat';

interface OrderDetailProps {
  style?: CSSProperties;
  className?: string;
}

const cx = bindClassNames(styles);

const OrderDetailComponent: React.FC<OrderDetailProps> = memo(({ style }) => {
  const orderDetailsPopupInfo = useSelector((state: any) => state.app.orderDetailsPopupInfo);

  useEffect(() => {
    Currency.initializeCurrency();
  }, [orderDetailsPopupInfo]);

  // Use OrderItemType as the record type for the table
  const columns: TableProps<OrderItemType>['columns'] = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (value, record: OrderItemType) => {
        if (!record.product.images || record.product.images.length === 0) return null;
        return (
          <div className="relative">
            <div className={cx('product-image', 'w-[100%] max-w-[55px] rounded-[5px] border')}>
              <a className={cx('relative block pb-[100%]')} href={`/products/${record.product.handle}`}>
                <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                  <LinkIcon />
                </div>
                <img className={cx('absolute')} src={record.product.images[0].url} alt="Error" loading="lazy" />
              </a>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Title',
      key: 'title',
      render: (_, record: OrderItemType) => {
        return (
          <div>
            <a href={`/products/${record.product.handle}`}>{record.product.title}</a>
            <div className={cx('product-variant', 'mt-[5px] text-[12px] text-grey-color')}>
              {record.product.variant &&
                record.product.variant.option_values.map((item, index) => {
                  return `${item.option_value.value}${index !== (record.product.variant?.option_values?.length ?? 0) - 1 ? '/' : ''}`;
                })}
            </div>
          </div>
        );
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        return (
          <span data-currency-value={price} className="money">
            {price}
          </span>
        );
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total_amount',
      render: (_, record: OrderItemType) => {
        // @ts-ignore
        const total_amount = parseInt(record.quantity) * parseInt(record.price);
        return (
          <span data-currency-value={total_amount} className="money text-red-color">
            {total_amount}
          </span>
        );
      }
    }
  ];
  const data: OrderItemType[] = orderDetailsPopupInfo.items;

  return (
    <div className="order-detail__wrapper w-full max-w-full" style={style}>
      <Table<OrderItemType>
        className="mt-[50px] h-full w-full overflow-scroll border pb-[30px]"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
});

export default OrderDetailComponent;
