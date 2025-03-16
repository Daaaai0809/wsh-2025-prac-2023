// import type { HttpOptions } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const asyncXhr: HttpOptions['fetch'] = (uri, options) => {
//   return new Promise((resolve, reject) => {
//     const method = options?.method;
//     if (!method) {
//       return reject(new Error('No HTTP method specified'));
//     }

//     const body = options?.body;
//     if (body instanceof ReadableStream) {
//       return reject(new Error('ReadableStream body not supported'));
//     }

//     const request = new XMLHttpRequest();
//     request.open(method, uri.toString(), true); // 非同期処理に変更

//     request.setRequestHeader('content-type', 'application/json');

//     request.onload = () => {
//       if (request.status >= 200 && request.status < 300) {
//         // 成功時にレスポンスを返却
//         resolve(new Response(request.response));
//       } else {
//         // ステータスコードが 2xx 以外の場合は失敗
//         reject(new Error(`HTTP error: ${request.status}`));
//       }
//     };

//     request.onerror = () => {
//       reject(new Error('Network error'));
//     };

//     request.send(body);
//   });
// };


const link = new HttpLink();

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    mutate: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
  link,
  queryDeduplication: false,
  uri: '/graphql',
});
