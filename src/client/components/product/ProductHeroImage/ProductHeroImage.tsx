// import CanvasKitInit from 'canvaskit-wasm';
// import CanvasKitWasmUrl from 'canvaskit-wasm/bin/canvaskit.wasm?url';
import classNames from 'classnames';
// import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

// async function loadImageAsDataURL(url: string): Promise<string> {
//   const CanvasKit = await CanvasKitInit({
//     // WASM ファイルの URL を渡す
//     locateFile: () => CanvasKitWasmUrl,
//   });

//   // 画像を読み込む
//   const data = await fetch(url).then((res) => res.arrayBuffer());
//   const image = CanvasKit.MakeImageFromEncoded(data);
//   if (image == null) {
//     // 読み込みに失敗したとき、透明な 1x1 GIF の Data URL を返却する
//     return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
//   }

//   // 画像を Canvas に描画して Data URL を生成する
//   const canvas = CanvasKit.MakeCanvas(image.width(), image.height());
//   const ctx = canvas.getContext('2d');
//   // @ts-expect-error ...
//   ctx?.drawImage(image, 0, 0);
//   return canvas.toDataURL();
// }

export async function loadImageAsDataURL(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // 取得に失敗したときは1x1透明GIFを返す
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    // 画像データを Blob として読み込む
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);

    // Image オブジェクトに読み込む
    const image = new Image();
    image.src = objectURL;

    // onload で描画準備完了を待つ
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject();
    });

    // Canvas を作成し、画像を描画して Data URL に変換
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
  } catch {
    // 例外発生時も1x1透明GIFを返す
    return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  }
}

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

const isEqual = (prev: Props, next: Props) => {
  return prev.product === next.product && prev.title === next.title;
};

export const ProductHeroImage: FC<Props> = memo(({ product, title }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const [imageDataUrl, setImageDataUrl] = useState<string>();

  // images/**/...なのをimages/webp/**/*.webpに変換
  const filename = thumbnailFile?.filename.replace(/images\/[^/]+/, 'images/webp/products').replace(/\.jpg$/, '.webp');

  useEffect(() => {
    if (filename === undefined) {
      return;
    }

    loadImageAsDataURL(filename).then((dataUrl) => setImageDataUrl(dataUrl.replace(/png/, 'webp')));
  }, [thumbnailFile]);

  if (imageDataUrl === undefined) {
    return null;
  }

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor href={`/product/${product.id}`}>
              <div className={styles.container()}>
                <AspectRatio ratioHeight={9} ratioWidth={16}>
                  <img className={styles.image()} src={filename} alt={product.name} />
                </AspectRatio>

                <div className={styles.overlay()}>
                  <p
                    className={classNames(styles.title(), {
                      [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description(), {
                      [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {product.name}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
}, isEqual);

ProductHeroImage.displayName = 'ProductHeroImage';
