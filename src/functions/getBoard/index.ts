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

    const ideas = await dynamo.query<IdeaRecord>({
      tableName,
      index: 'index1',
      pkValue: `idea-${boardId}`,
      pkKey: 'pk',
    });

    const ideaDataPromiseArray = ideas.map(async ({ pk, sk, boardId, ...ideaData }) => {
      const votes = await dynamo.query<VoteRecord>({
        tableName,
        index: 'index1',
        pkValue: `vote-${ideaData.id}`,
        pkKey: 'pk',
      });
      return {
        ...ideaData,
        votes: votes.length,
      };
    });

    const ideaDataArray = (await Promise.all(ideaDataPromiseArray)).sort(
      (a, b) => a.votes - b.votes
    );

    return formatJSONResponse({
      body: {
        ...responseData,
        ideas: ideaDataArray,
      },
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
