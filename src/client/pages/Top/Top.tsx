import { useMemo, useState, type FC } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

export const Top: FC = () => {
  const { recommendation, loading: loadingReccomendation } = useRecommendation();
  const { features, loading: loadingFeatures } = useFeatures();

  const recommendationProduct = useMemo(() => {
    if (recommendation === undefined) {
      return undefined;
    }
    
    return recommendation.product;
  }, [recommendation, loadingReccomendation]);

  const featuresList = useMemo(() => {
    if (features === undefined) {
      return [];
    }

    return features;
  }, [features, loadingFeatures]);

  // if (loadingReccomendation || loadingFeatures) {
  //   return <div style={{
  //     height: '100vh',
  //   }}></div>
  // }

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <ProductHeroImage product={recommendationProduct} title="今週のオススメ" />

          { featuresList && (
            <div className={styles.featureList()}>
              {featuresList.map((featureSection) => {
                return (
                  <div key={featureSection.id} className={styles.feature()}>
                    <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                    <ProductList featureSection={featureSection} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
