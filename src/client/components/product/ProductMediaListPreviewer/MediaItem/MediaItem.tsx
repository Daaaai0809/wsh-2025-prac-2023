import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItem.styles';
import { loadThumbnail } from './loadThumbnail';
import { FaPlay } from 'react-icons/fa';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItem: FC<Props> = ({ file }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const mediaType = getMediaType(file.filename);

  useEffect(() => {
    if (mediaType === 'image') {
      return setImageSrc(file.filename.replace(/images\/[^/]+/, 'images/webp/products').replace(/\.jpg$/, '.webp'));
    }
    loadThumbnail(file.filename).then((url) => setImageSrc(url));
  }, [file.filename, mediaType]);

  if (imageSrc === undefined) {
    return null;
  }

  return (
    <div className={styles.container()}>
      <Image fill src={imageSrc} ratioHeight={1} ratioWidth={1} />
      {mediaType === 'video' && (
        <div className={styles.playIcon()}>
          {/* <Icon color="#ffffff" height={16} type="FaPlay" width={16} /> */}
          <span style={{ color: '#ffffff', height: 16, width: 16 }}>
            <FaPlay />
          </span>
        </div>
      )}
    </div>
  );
};
