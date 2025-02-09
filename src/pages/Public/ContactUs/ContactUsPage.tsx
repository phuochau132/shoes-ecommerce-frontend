import styles from './contactUs.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { useCallback, useEffect, useState } from 'react';
import TermAndConditionComponent from '@/components/cart/termAndConditionButton';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useSendmailMutation } from '@/apis/user/user.api';
import useValidation, { useForm } from '@/utils/hooks/form';
import mailerValidationSchema from '@/validations/mailer.validation';

const cx = bindClassNames(styles);
export type ContactFormDataType = {
  name: string;
  email: string;
  message: string;
};
const initialContactFormData = {
  name: '',
  email: '',
  message: ''
};
const ContactUsPage = () => {
  const dispatch = useDispatch();
  const [sendmail, { isLoading }] = useSendmailMutation();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const { errors: sendContactFormErrors, validate: validateSendContactForm } = useValidation(
    mailerValidationSchema.contactForm
  );
  const {
    formData: contactFormData,
    handleChange: handleContactForm,
    setFormData: setContactFormData
  } = useForm(initialContactFormData);
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
  const handleSendContactForm = useCallback(
    async (values: ContactFormDataType) => {
      const errors: any = await validateSendContactForm(values);
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        try {
          const res = await sendmail(values).unwrap();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [contactFormData]
  );

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
              Phone: +84 (979) 574-301
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
              Email: nguyenhauxmvt@gmail.com
              <br />
              <br />
              <strong className="text-[20px]">
                Press Enquiries:
                <br />
              </strong>
              Email: nguyenhauxmvt@gmail.com
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
                <InputComponent
                  name="name"
                  onChange={handleContactForm}
                  value={contactFormData.name}
                  className={`rounded-[10px] ${sendContactFormErrors.name && 'border-red-500'}`}
                  placeholder="Your Name"
                  title="Your name"
                ></InputComponent>
                <InputComponent
                  name="email"
                  onChange={handleContactForm}
                  value={contactFormData.email}
                  className={`rounded-[10px] ${sendContactFormErrors.email && 'border-red-500'}`}
                  placeholder="Your Email"
                  title="Your Email"
                ></InputComponent>
              </div>
              <textarea
                onChange={handleContactForm}
                value={contactFormData.message}
                className={`mt-[20px] min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none ${sendContactFormErrors.message && 'border-red-500'}`}
                name="message"
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendContactForm(contactFormData);
                  }}
                  disabled={!isTermsChecked}
                  isLoading={isLoading}
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
