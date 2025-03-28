import type { FC } from 'react';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';
// import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';

import * as styles from './ReviewList.styles';

type Props = {
  reviews: ReviewFragmentResponse[];
};

export const ReviewList: FC<Props> = ({ reviews }) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <ul className={styles.itemList()}>
      {reviews.map((review) => {
        const endTime = window.Temporal.Instant.from(review.postedAt).toLocaleString('ja-jp', {
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          month: '2-digit',
          second: '2-digit',
          year: 'numeric',
        });

        return (
          <li key={review.id} className={styles.item()} data-testid="review-list-item">
            <div className={styles.avaterImage()}>
              <Image height={52} src={review.user.profile.avatar.filename.replace(/images\/[^/]+/, 'images/webp/avatars').replace(/\.jpg$/, '.webp')} width={52} loading='lazy' ratioWidth={1} ratioHeight={1}/>
            </div>
            <div className={styles.content()}>
              <time className={styles.time()}>{endTime}</time>
              <p className={styles.comment()}>{review.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
