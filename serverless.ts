import type { AWS } from '@serverless/typescript';

import receiver from '@functions/notifications/receiver';
import receiverBulk from '@functions/notifications/receiver-bulk';
import sender from '@functions/notifications/sender';
import template from '@functions/notifications/template';

const serverlessConfiguration: AWS = {
  service: 'aws-email-sqs-ses',
  frameworkVersion: '3',
  disabledDeprecations: ['CLI_OPTIONS_SCHEMA'],
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamManagedPolicies: [
      'arn:aws:iam::aws:policy/AmazonSQSFullAccess',
      'arn:aws:iam::aws:policy/AmazonSESFullAccess',
    ],
  },
  // import the function via paths
  functions: { receiver, receiverBulk, sender, template },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
