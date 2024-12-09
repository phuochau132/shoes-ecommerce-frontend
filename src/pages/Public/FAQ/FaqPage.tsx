import styles from './faq.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ButtonComponent } from '@/components/commons';
import CollapsibleBlock from '@/components/commons/collapse';
import { ListFAQ } from '@/types/faq';
import { useEffect } from 'react';
import { setPageInfo } from '@/redux/app/app.slice';
import { useDispatch } from 'react-redux';

const cx = bindClassNames(styles);
const listfaqs: ListFAQ[] = [
  {
    title: 'Shopping Information',
    faqs: [
      {
        question: 'Pellentesque habitant morbi tristique senectus et netus?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'How much is shipping and how long will it take?',
        answer:
          'The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        question: 'How long will it take to get my package?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'Branding is simply a more efficient way to sell things?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      }
    ]
  },
  {
    title: 'Payment Information',
    faqs: [
      {
        question: 'Pellentesque habitant morbi tristique senectus et netus?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'How much is shipping and how long will it take?',
        answer:
          'The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        question: 'How long will it take to get my package?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'Branding is simply a more efficient way to sell things?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      }
    ]
  },
  {
    title: 'Order & Returns',
    faqs: [
      {
        question: 'Pellentesque habitant morbi tristique senectus et netus?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'How much is shipping and how long will it take?',
        answer:
          'The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        question: 'How long will it take to get my package?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'Branding is simply a more efficient way to sell things?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      }
    ]
  },
  {
    title: 'Ordering from Umino',
    faqs: [
      {
        question: 'Pellentesque habitant morbi tristique senectus et netus?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'How much is shipping and how long will it take?',
        answer:
          'The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        question: 'How long will it take to get my package?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      },
      {
        question: 'Branding is simply a more efficient way to sell things?',
        answer:
          'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
      }
    ]
  }
];

const ContactUsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'FAQ' }
        ],
        title: 'Help Center',
        description: 'Please use the below form. You can also call customer service on +1 (973) 435-3638.'
      })
    );
  }, []);
  return (
    <div className={cx('container-1570 mx-[auto]', 'contact-page')}>
      <div className={cx('page-content', 'flex gap-[50px] phone:flex-col-reverse tabletUp:relative')}>
        <div
          className={cx(
            'left-content',
            'h-[max-content] rounded-[10px] bg-grey-bg p-[40px] tabletUp:sticky tabletUp:top-[2%] tabletUp:max-w-[30%]'
          )}
        >
          <div className={cx('left__content-contactUs')}>
            <div className={cx('heading')}>
              <h3>Contact Us</h3>
            </div>
            <p className="mt-[25px]">
              If you have an issue or question that requires immediate assistance, you can click the button below to
              chat live with a Customer Service representative.
            </p>
            <p className="mt-[20px]">
              Please allow 3 - 5 business days from the time your package arrives back to us for a refund to be issued.
            </p>
          </div>
          <div className={cx('actions')}>
            <ButtonComponent link="/pages/contact-us" as={`a`}>
              Contact Us
            </ButtonComponent>
          </div>
        </div>
        <div className={cx('right-content', 'flex-1')}>
          <div className={cx('faqs')}>
            {listfaqs.map((faq, index) => {
              return (
                <div key={index} className={cx('faq-item', { 'mt-[50px]': index != 0 })}>
                  <div className={cx('heading')}>
                    <h3>{faq.title}</h3>
                  </div>
                  {faq.faqs.map((faq, index) => {
                    return (
                      <CollapsibleBlock
                        classNameForHeading="text-[16px] "
                        key={index}
                        className="mt-[20px]"
                        title={faq.question}
                      >
                        <p className="mb-[20px]">{faq.answer}</p>
                      </CollapsibleBlock>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
