import { formatJSONResponse } from '@libs/APIResponses';
import dynamo from '@libs/Dynamo';

export const handler = async () => {
  try {
    const tableName = process.env.singleTable;

    const boards = await dynamo.query<BoardRecord>({
      tableName,
      index: 'index1',
      pkKey: 'pk',
      pkValue: 'board',
      limit: 10,
    });

    const responseData = boards
      .map(({ pk, sk, ...rest }) => rest)
      .filter((board) => board.isPublic);

    return formatJSONResponse({
      body: responseData,
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
