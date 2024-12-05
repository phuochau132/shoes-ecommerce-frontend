import React, { CSSProperties, memo } from 'react';
import styles from './termAndConditionButton.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CheckedIcon } from '@/utils/icons';

const cx = bindClassNames(styles);

interface ElementProps extends React.HTMLAttributes<HTMLElement> {
  style?: CSSProperties;
  className?: string;
  callback?: (state: boolean) => void;
}

const TermAndConditionComponent: React.FC<ElementProps> = memo(({ callback }) => {
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
          <p className="font-bold">
            I agree with <span className="font-[400]">Terms & Conditions</span>
          </p>
        </label>
      </div>
    </div>
  );
});

export default TermAndConditionComponent;
