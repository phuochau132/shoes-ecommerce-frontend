import styles from './contactUs.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { useEffect, useState } from 'react';
import TermAndConditionComponent from '@/components/cart/termAndConditionButton';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/slice/app/app.slice';

const cx = bindClassNames(styles);

const ContactUsPage = () => {
  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Contact Us' }
        ],
        title: 'Contact Us',
        description: 'Please use the below form. You can also call customer service on +1 (973) 435-3638.'
      })
    );
  }, []);
  return (
    <div className={cx('mx-[auto]', 'contact-page')}>
      <div className={cx('page-content')}>
        <div className={cx('map', 'overflow-hidden rounded-[10px]')}>
          <iframe
            className="w-[100%]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250966.7220937894!2d107.29295536492928!3d10.629502325101361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175baafe45e8c09%3A0x62d4ede9e4de63a2!2zWHV5w6puIE3hu5ljLCBCw6AgUuG7i2EgLSBWxaluZyBUw6B1LCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1733269682457!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={cx('contact-form', 'mt-[50px] flex phone:flex-col')}>
          <div className={cx('contact_form-left', 'max-w-[40%] phone:max-w-[100%]')}>
            <div className={cx('contact-heading', 'heading')}>
              <h3>Suport Customer</h3>
              <p>Have a question? Please contact us using the customer support channels below.</p>
            </div>
            <p className="mt-[20px]">
              <strong className="text-[20px]">
                Customer Care:
                <br />
              </strong>
              Phone: +1 (973) 435-3638
              <br />
              Email: info@fashionwomen.com
              <br />
              Opening hours: Everyday 8:00am - 5:00pm
            </p>
            <p className="mt-[20px]">
              <strong className="text-[20px]">
                Wholesale:
                <br />
              </strong>
              Email: sale@fashionwomen.com
              <br />
              <br />
              <strong className="text-[20px]">
                Press Enquiries:
                <br />
              </strong>
              Email: press@fashionwomen.com
            </p>
          </div>
          <div
            className={cx('contact_form-right', 'flex-1 pl-[100px] phone:mt-[40px] phone:max-w-[100%] phone:pl-[0]')}
          >
            <div className={cx('heading')}>
              <h3>Contact Us</h3>
              <p>
                Please submit all general enquiries in the contact form below and we look forward to hearing from you
                soon.
              </p>
            </div>
            <form className={cx('mt-[20px]')}>
              <div className={cx('flex', 'gap-[10px]')}>
                <InputComponent className="rounded-[10px]" placeholder="Your Name" title="Your name"></InputComponent>
                <InputComponent className="rounded-[10px]" placeholder="Your Email" title="Your Email"></InputComponent>
              </div>
              <textarea
                className="mt-[20px] min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none"
                name="note"
                form="cart"
                id="Cart-note"
                placeholder="How can we help you?"
                data-listener-added_e50af269="true"
              ></textarea>
              <TermAndConditionComponent
                callback={(state) => {
                  setIsTermsChecked(state);
                }}
              />
              <div className="flex">
                <ButtonComponent
                  disabled={!isTermsChecked}
                  className={`max-w-[200px] ${!isTermsChecked ? 'pointer-events-none cursor-not-allowed opacity-50' : 'pointer-events-auto'}`}
                >
                  Send
                </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
