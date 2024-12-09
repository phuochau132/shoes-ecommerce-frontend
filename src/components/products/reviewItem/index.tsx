import React, { memo, CSSProperties, useRef } from 'react';
import styles from './review.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ReviewType } from '@/types/review';

interface ReviewItemComponentProps {
  style?: CSSProperties;
  review: ReviewType;
  callback: (total: number) => JSX.Element;
  className?: string;
}

const ReviewItemComponent: React.FC<ReviewItemComponentProps> = memo(({ review, callback, className }) => {
  return (
    <div className={`review-item ${className && className}`}>
      <div className="review-header flex justify-between">
        <div className="user-info flex items-center gap-[10px]">
          <div className="icon h-[50px] w-[50px] rounded-full bg-color-border p-[10px]">
            <img src="https://cdn-icons-png.flaticon.com/128/8722/8722274.png" className="h-full w-full" alt="" />
          </div>
          <div className="name">
            <p className="text-[16px] font-[600]">{review.author.name}</p>
            <div className="date text-color-grey mt-[5px] font-normal opacity-[0.7]">
              {review.createAt.toLocaleDateString('en-US')}
            </div>
          </div>
        </div>
        <div className="star">{callback(review.rating)}</div>
      </div>
      <div className="review-content mt-[20px]">
        <div className="title text-[15px] font-[600]">{review.title}</div>
        <div className="comment">{review.text}</div>
      </div>
    </div>
  );
});

export default ReviewItemComponent;
