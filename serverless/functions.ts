import { AWS } from '@serverless/typescript';

interface Authorizer {
  name: string;
  type: string;
  arn: {
    'Fn::GetAtt': string[];
  };
}
const authorizer: Authorizer = {
  name: 'authorizer',
  type: 'COGNITO_USER_POOLS',
  arn: { 'Fn::GetAtt': ['CognitoUserPool', 'Arn'] },
};

const functions: AWS['functions'] = {
  createBoard: {
    handler: 'src/functions/createBoard/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/boards',
          authorizer,
          cors: true,
        },
      },
    ],
  },
  getBoards: {
    handler: 'src/functions/getBoards/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/boards',
          // authorizer,
        },
      },
    ],
  },
  getPrivateBoards: {
    handler: 'src/functions/getPrivateBoards/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: 'private-boards',
          // authorizer,
        },
      },
    ],
  },
  getBoard: {
    handler: 'src/functions/getBoard/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/boards/{boardId}',
          // authorizer,
        },
      },
    ],
  },
  createIdea: {
    handler: 'src/functions/createIdea/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/ideas',
          authorizer,
          cors: true,
        },
      },
    ],
  },
  voteOnIdea: {
    handler: 'src/functions/voteOnIdea/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/ideas/{ideaId}',
          authorizer,
          cors: true,
        },
      },
    ],
  },
};

export default functions;
