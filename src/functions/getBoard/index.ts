import { formatJSONResponse } from '@libs/APIResponses';
import dynamo from '@libs/Dynamo';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const boardId = event.pathParameters.boardId;

    const board = await dynamo.get<BoardRecord>({
      tableName,
      pkValue: boardId,
    });

    if (!board.id) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: 'no board with that id found' },
      });
    }

    const { pk, sk, ...responseData } = board;

    return formatJSONResponse({
      body: responseData,
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
