import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import dynamo from '@libs/Dynamo';
import { v4 as uuid } from 'uuid';
import { getUserId } from '@libs/APIGateway';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body!);
    const tableName = process.env.singleTable;

    const validationError = validateBody(body);

    if (validationError) {
      return validationError;
    }

    const { name, description, isPublic = false } = body as CreateBoardBody;

    const data: BoardRecord = {
      id: uuid(),
      pk: 'board',
      sk: Date.now().toString(),

      ownerId: getUserId(event),
      boardName: name,
      description,
      isPublic,
      date: Date.now(),
    };

    await dynamo.write({ data, tableName });

    return formatJSONResponse({
      body: { message: 'board successfully created', id: data.id },
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};

const validateBody = (body: Record<string, any>) => {
  if (!body.name) {
    return formatJSONResponse({ body: { message: 'name is required' }, statusCode: 400 });
  }

  return;
};
