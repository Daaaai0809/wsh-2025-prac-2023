import { useQuery, QueryResult } from '@apollo/client';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const recommendationsResult = useQuery<GetRecommendationsQueryResponse>(GetRecommendationsQuery);

  const hour = window.Temporal.Now.plainTimeISO().hour;
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined, ...recommendationsResult };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation, ...recommendationsResult };
};
