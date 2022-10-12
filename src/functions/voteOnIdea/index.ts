import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import dynamo from '@libs/Dynamo';
import { v4 as uuid } from 'uuid';
import { getUserId } from '@libs/APIGateway';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;
    const { ideaId } = event.pathParameters;

    const userId = getUserId(event);

    const existingVote = await dynamo.query({
      tableName,
      index: 'index1',
      pkValue: `vote-${ideaId}`,
      pkKey: 'pk',
      skValue: userId,
      skKey: 'sk',
    });

    if (existingVote.length !== 0) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: `You have already voted for this idea` },
      });
    }

    const data: VoteRecord = {
      id: uuid(),
      pk: `vote-${ideaId}`,
      sk: userId,

      userId,
      ideaId,
    };

    await dynamo.write({ data, tableName });

    return formatJSONResponse({
      body: { message: 'you voted on this idea', id: data.id },
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
