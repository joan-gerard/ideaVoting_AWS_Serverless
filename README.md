# Idea Voting App - AWS Serverless

DESC HERE

### Live demo

ADD URL
There is a deployed basic MVP [here]()

### Project structure
TO BE UPDATED
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── dynamoResources         # DynamoDB table configuration 
│   └── functions               # config pointing to handlers websocket routes 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── createRoom
│   │   │   └── index.ts        # lambda allowing user to create Room and adding connection record to Dynamo
│   │   ├── disconnect
│   │   │   └── index.ts        # lambda removing connection record from Dynamo
│   │   ├── joinRoom
│   │   │   └── index.ts        # lambda allowing user to join Room and adding another connection record to Dynamo
│   │   └── sendMessage
│   │       └── index.ts        # lambda allowing user to send a message 
│   │
│   └── libs                    
│       ├── dynamo.ts           # DynamoDB 'write', 'get' and 'query' functions
│       ├── apiGateway.ts       # API Gateway specific helpers (e.g. formatJSONResponse)
│       └── websocket.ts        # Create new websocket client
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```# ideaVoting_AWS_Serverless
