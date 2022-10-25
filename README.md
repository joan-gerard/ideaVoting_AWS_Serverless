# Idea Voting App - AWS Serverless

For this project, I wanted to apply the concept of ‘single-table design’ to my Dynamo database and introduce two new Amazon products to my projects, namely Cognito and Amplify.

The application that I built allows users to sign-in or sign-up, create polling boards, add ideas to existing boards and vote on the ideas they prefer.

### Live demo

There is a deployed basic MVP [here](https://timely-boba-d84bb0.netlify.app/)

### Project structure
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── cognito                 # Cognito User Pool and User Pool Client configuration 
│   ├── dynamodb                # DynamoDB table configuration 
│   └── functions               # config pointing to handlers websocket routes 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── createBoard
│   │   │   └── index.ts        # lambda allowing user to create a Board
│   │   ├── createIdea
│   │   │   └── index.ts        # lambda allowing user to add Ideas to an existing Board
│   │   ├── deleteBoard
│   │   │   └── index.ts        # lambda allowing user to delete a Board
│   │   ├── getBoard
│   │   │   └── index.ts        # lambda allowing user to fetch a Board with an Id
│   │   ├── getBoards
│   │   │   └── index.ts        # lambda allowing user to fetch all public Boards
│   │   ├── getPrivateBoards
│   │   │   └── index.ts        # lambda allowing user to fetch all private Boards
│   │   └── voteOnIdea
│   │       └── index.ts        # lambda allowing user to Vote on an existing Idea 
│   │
│   └── libs                    # Folder containing helper functions
│       ├── Dynamo.ts           # DynamoDB 'write', 'get', 'delete', 'query' and 'update' functions
│       ├── apiGateway.ts       # getUserId based on Cognito Authorizer
│       └── APIResponses.ts     # API Gateway specific helpers (e.g. formatJSONResponse)
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```# ideaVoting_AWS_Serverless
