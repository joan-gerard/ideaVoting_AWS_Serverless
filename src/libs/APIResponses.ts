// interface APIGatewayResponse {
//   body: string;
//   statusCode: number;
//   headers?: { [key: string]: string };
// }

export const formatJSONResponse = ({
  body,
  statusCode = 200,
  headers,
}: {
  body: any;
  statusCode?: number;
  headers?: { [key: string]: string };
}) => {
  const headerTest = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      ...headers,
    },
    statusCode,

    body: JSON.stringify(body),
  };

  console.log({ headerTest });

  return headerTest;

  // console.log({headers})

  // return {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Methods': '*',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': '*',
  //     ...headers,
  //   },
  //   statusCode,

  //   body: JSON.stringify(body),
  // } as APIGatewayResponse;
};
