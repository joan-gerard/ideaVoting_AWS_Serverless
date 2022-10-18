import { formatJSONResponse } from '@libs/APIResponses';
import dynamo from '@libs/Dynamo';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const boardId = event.pathParameters.boardId;

    await dynamo.delete({
      tableName,
      pkValue: boardId,
    });

    return formatJSONResponse({
      body: {
        message: 'board deleted',
      },
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
