import { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-serverless-api',
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
  },
  functions: {
    getEndpoint: {
      handler: 'src/handlers/getHandler.handler',
      events: [
        {
          http: {
            path: 'get-data',
            method: 'get',
          },
        },
      ],
    },
    postEndpoint: {
      handler: 'src/handlers/postHandler.handler',
      events: [
        {
          http: {
            path: 'create-data',
            method: 'post',
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      MyDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'myServerlessTable',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
