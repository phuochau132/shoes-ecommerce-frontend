import React, { CSSProperties, memo } from 'react';
import styles from './termAndConditionButton.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CheckedIcon } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setPoliciesPopupState } from '@/redux/slice/app/app.slice';

const cx = bindClassNames(styles);

interface ElementProps extends React.HTMLAttributes<HTMLElement> {
  style?: CSSProperties;
  className?: string;
  callback?: (state: boolean) => void;
}

const TermAndConditionComponent: React.FC<ElementProps> = memo(({ callback }) => {
  const dispatch = useDispatch<any>();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (callback) callback(event.target.checked);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('term-conditions', 'checkbox-field')}>
        <input id="term__conditions-input" type="checkbox" onChange={handleCheckboxChange} />
        <label className={cx('flex gap-[10px] py-[10px]')} htmlFor="term__conditions-input">
          <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
            <CheckedIcon />
          </span>
          <div className="font-bold">
            I agree with
            <a
              onClick={() => {
                dispatch(setPoliciesPopupState(true));
              }}
              className="ml-[5px] font-normal underline"
            >
              Terms & Conditions
            </a>
          </div>
        </label>
      </div>
    </div>
  );
});

export default TermAndConditionComponent;
