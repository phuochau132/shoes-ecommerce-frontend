import React, { memo, CSSProperties } from 'react';
import { ReviewType } from '@/types/review';
import { useSelector } from 'react-redux';
import { RemoveIcon } from '@/utils/icons';

interface ReviewItemComponentProps {
  style?: CSSProperties;
  review: ReviewType;
  callback: (total: number) => JSX.Element;
  className?: string;
  handleRemoveReview: (id: number) => void;
}

const ReviewItemComponent: React.FC<ReviewItemComponentProps> = memo(
  ({ review, callback, className, handleRemoveReview }) => {
    const { user } = useSelector((state: any) => state.user);
    return (
      <div className={`review-item ${className && className}`}>
        <div className="review-header flex justify-between">
          <div className="user-info flex gap-[10px]">
            <div className="icon h-[50px] w-[50px] rounded-full bg-color-border">
              <img src={review.user.image} className="h-full w-full object-cover" alt="Error" />
            </div>
            <div className="name">
              <p className="text-[16px] font-[600]">{review.user.full_name}</p>
              <div className="date text-color-grey mt-[5px] flex items-center font-normal opacity-[0.7]">
                {new Date(review.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                {user && user.id == review.user.id && (
                  <div
                    onClick={() => {
                      handleRemoveReview(review.id);
                    }}
                    className="deleteReview-action ml-[10px] cursor-pointer"
                  >
                    <RemoveIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="star">{callback(review.rating)}</div>
        </div>
        <div className="review-content mt-[20px]">
          <div className="title text-[15px] font-[600]">{review.title}</div>
          <div className="comment">{review.content}</div>
        </div>
      </div>
    );
  }
);

export default ReviewItemComponent;
