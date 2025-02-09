import { useCallback, useEffect, useState } from 'react';
import styles from './account.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { useDispatch } from 'react-redux';
import { setOrderDetailsPopupInfo, setPageInfo } from '@/redux/slice/app/app.slice';
import { AccountPageEnum } from '@/types/enum/accountPage';
import { useSelector } from 'react-redux';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { Button, Image, Space, Table, TableProps, Tag, Upload, UploadFile, UploadProps } from 'antd';
import { FileType, getBase64 } from '@/utils/helpers/base64';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { clearUser, setUser } from '@/redux/slice/user/user.slice';
import useValidation, { useForm } from '@/utils/hooks/form';
import { uploadFile } from '@/utils/helpers/cloudinary';
import { useUpdateProfileMutation } from '@/apis/user/user.api';
import { authSchema } from '@/validations/auth.validation';
import { useGetOrderMutation } from '@/apis/order/order.api';
import { EPaymentMethod } from '../Checkout/CheckoutPage';
import { Currency } from '@/utils/helpers/currenciesFormat';
import { OrderType } from '@/types/order';

const cx = bindClassNames(styles);

const AccountDetailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [page, setPage] = useState(AccountPageEnum.dashboard);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { errors: updateErrors, validate: validateUpdateForm } = useValidation(authSchema);
  const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateProfileMutation();
  const [getOrderByUser, { isLoading: isGetOrderLoading }] = useGetOrderMutation();
  const [orders, setOrders] = useState([]);
  const {
    formData: infoFormdata,
    handleChange: handleChangeInfoChange,
    setFormData: setInfoFormdata
  } = useForm({ ...user });
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await getOrderByUser({}).unwrap();
        setOrders(response.data);
      } catch (error) {}
    };
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Account' }
        ],
        title: 'My Account'
      })
    );
    getOrder();
  }, []);
  useEffect(() => {
    Currency.initializeCurrency();
  }, [orders]);
  const checkDifferences = useCallback(() => {
    if (fileList.length) return true;
    for (let key in user) {
      if (user.hasOwnProperty(key) && infoFormdata.hasOwnProperty(key)) {
        if (user[key] !== infoFormdata[key] && infoFormdata[key]) {
          return true;
        }
      }
    }
    return false;
  }, [infoFormdata, fileList]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const isChecked = checkDifferences();
  const handleProfileUpdate = useCallback(async () => {
    await validateUpdateForm(infoFormdata);
    if (Object.keys(updateErrors).length === 0) {
      let formData = infoFormdata;
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        if (file) {
          try {
            const data = await uploadFile({ file });
            formData = {
              ...formData,
              image: data.url
            };
          } catch (error) {}
        }
      }
      const updateRes = await updateProfile(formData);
      if (updateRes.data?.data) {
        setFileList([]);
        dispatch(setUser(updateRes.data?.data));
      }
    }
  }, [infoFormdata, fileList]);
  const columns: TableProps<OrderType>['columns'] = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Created',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => {
        return (
          <div>
            {new Date(timestamp.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        );
      }
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (total_amount: string) => {
        return (
          <span data-currency-value={total_amount} className="money text-red-color">
            {total_amount}
          </span>
        );
      }
    },
    {
      title: 'Detail Address',
      dataIndex: 'detail_address',
      key: 'detail_address'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';

        switch (status) {
          case 'pending':
            color = 'orange';
            text = 'Pending';
            break;
          case 'paid':
            color = 'green';
            text = 'Paid';
            break;
          case 'failed':
            color = 'red';
            text = 'Failed';
            break;
          default:
            color = 'default';
            text = status;
        }

        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      dataIndex: 'payment_method',
      render: (payment_method: EPaymentMethod) => {
        let color = payment_method === EPaymentMethod.cash_on_delivery ? 'green' : 'volcano';
        let text = payment_method === EPaymentMethod.cash_on_delivery ? 'Cash on Delivery' : 'PayPal';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Fulfillment',
      key: 'fulfillment',
      dataIndex: 'fulfillment',
      render: (fulfillment: number) => {
        let color = fulfillment === 1 ? 'green' : 'red';
        let text = fulfillment === 1 ? 'Paid' : 'Unpaid';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                dispatch(
                  setOrderDetailsPopupInfo({
                    items: record.items,
                    isShowed: true
                  })
                );
              }}
            >
              View Detail
            </Button>
          </Space>
        );
      }
    }
  ];

  const data: OrderType[] = orders;

  return (
    <div className={cx('mx-[auto]', 'contact-page')}>
      <div className={cx('page-content', 'flex gap-[50px] phone:flex-col tabletUp:relative')}>
        <div
          className={cx(
            'left__content',
            'h-[fit-content] w-full overflow-hidden rounded-[10px] border phoneUp:max-w-[25%]'
          )}
        >
          <ul className="list-tabs">
            <li
              onClick={() => {
                setPage(AccountPageEnum.dashboard);
              }}
              className={cx('tab', 'dashBoard-tab', { 'bg-grey-bg': page == AccountPageEnum.dashboard })}
            >
              <span className="link">Dashboard</span>
            </li>
            <li
              onClick={() => {
                setPage(AccountPageEnum.account);
              }}
              className={cx('tab', 'address-tab', { 'bg-grey-bg': page == AccountPageEnum.account })}
            >
              <span className="link">Your Account</span>
            </li>
            <li className={cx('tab', 'wishList-tab', 'p-[0]', { 'bg-grey-bg': page == AccountPageEnum.wishlist })}>
              <a className="link block w-full px-[2rem] py-[1.5rem]" href="/pages/wishlist">
                <span>Your Wishlist</span>
              </a>
            </li>
            <li
              onClick={() => {
                dispatch(clearUser());
              }}
              className={cx('tab', 'logout-tab')}
            >
              <span className="link">Log Out</span>
            </li>
          </ul>
        </div>
        <div className={cx('right__content', 'flex-[1] phoneUp:max-w-[75%]')}>
          {page == AccountPageEnum.dashboard && (
            <div className={cx('dashboard-content')}>
              <div className="mb-30 text-[15px]">
                <span>
                  Welcome
                  <strong className="ml-[5px]">{user.full_name ? user.full_name : 'you'}</strong>!
                </span>
                <span>
                  (Not?
                  <strong className="ml-[5px]">{user.full_name ? user.full_name : 'you'}</strong>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(clearUser());
                    }}
                    className="ml-[5px] underline"
                  >
                    Log Out
                  </a>
                  )
                </span>
              </div>
              <div className="order-section relative mt-[30px]">
                <h3 className="heading">Order history</h3>
                <Table<OrderType>
                  loading={isGetOrderLoading}
                  className="mt-[20px] border"
                  scroll={{ x: '100%' }}
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                />
              </div>
            </div>
          )}
          {page == AccountPageEnum.account && (
            <div className={cx('addresses-content')}>
              <div className="account-details">
                <h3 className="heading">Account Settings</h3>
                <div className={cx('account__details-content', 'fields', 'mt-[10px] rounded-[5px]')}>
                  <div className={cx('field')}>
                    <label className={cx('label-field')}>
                      Profile Picture
                      {fileList.length > 0 && <EditOutlined className="ml-2 text-[12px] text-blue-500" />}
                    </label>
                    <div className="flex gap-[10px]">
                      {user.image && (
                        <Image className="h-[100px] w-[100px] overflow-hidden rounded-[10px]" src={user.image} />
                      )}
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleImageChange}
                        beforeUpload={() => false}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{ display: 'none' }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage('')
                          }}
                          src={previewImage}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap">
                    <div className={cx('field')}>
                      <div className="mb-[8px] flex justify-between">
                        <label className={cx('label-field')}>
                          Full Name
                          {infoFormdata.full_name !== user.full_name && infoFormdata.full_name && (
                            <EditOutlined className="ml-2 text-[12px] text-blue-500" />
                          )}
                        </label>
                        {updateErrors.full_name && <span className="error">{updateErrors.full_name}</span>}
                      </div>
                      <InputComponent
                        name="full_name"
                        className={cx('rounded-[10px]')}
                        onChange={handleChangeInfoChange}
                        placeholder={user.full_name}
                      ></InputComponent>
                    </div>
                    <div className={cx('field')}>
                      <div className="mb-[8px] flex justify-between">
                        <label className={cx('label-field')}>
                          Email
                          {infoFormdata.email !== user.email && (
                            <EditOutlined className="ml-2 text-[12px] text-blue-500" />
                          )}
                        </label>
                      </div>
                      <InputComponent
                        type="email"
                        name="email"
                        onChange={handleChangeInfoChange}
                        className={cx('rounded-[10px]')}
                        placeholder={user.email}
                        readOnly={true}
                      ></InputComponent>
                    </div>
                    <div className={cx('field')}>
                      <div className="mb-[8px] flex justify-between">
                        <label className={cx('label-field')}>
                          Telephone
                          {infoFormdata.telephone !== user.telephone && infoFormdata.telephone && (
                            <EditOutlined className="ml-2 text-[12px] text-blue-500" />
                          )}
                        </label>
                        {updateErrors.telephone && <span className="error">{updateErrors.telephone}</span>}
                      </div>
                      <InputComponent
                        type="text"
                        name="telephone"
                        onChange={handleChangeInfoChange}
                        className={cx('rounded-[10px]')}
                        placeholder={user.telephone}
                      ></InputComponent>
                    </div>
                    <div className={cx('field')}>
                      <div className="mb-[8px] flex justify-between">
                        <label className={cx('label-field')}>
                          Address
                          {infoFormdata.address !== user.address && infoFormdata.address && (
                            <EditOutlined className="ml-2 text-[12px] text-blue-500" />
                          )}
                        </label>
                        {updateErrors.address && <span className="error">{updateErrors.address}</span>}
                      </div>

                      <InputComponent
                        type="text"
                        name="address"
                        onChange={handleChangeInfoChange}
                        className={cx('rounded-[10px]')}
                        placeholder={user.address}
                      ></InputComponent>
                    </div>
                  </div>
                </div>
                <ButtonComponent
                  isLoading={isUpdateLoading}
                  onClick={handleProfileUpdate}
                  disabled={!isChecked}
                  className={`max-w-[200px] rounded-[10px] ${!isChecked && 'pointer-events-none opacity-[0.7]'}`}
                >
                  Update Profile
                </ButtonComponent>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
