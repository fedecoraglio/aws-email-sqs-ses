import * as dotenv from 'dotenv';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ReceiverService } from '@services/notifications/receiver/receiver.service';
import schema from './schema';

dotenv.config();

const receiverBulk: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  _event,
  _context,
) => {
  console.log('Receiving bulk messages to send');
  const response = await new ReceiverService().pushBulkMessage(_event.body);
  console.log('Emails was sent to sqs');
  return {
    message: { ...response },
  };
};

export const main = middyfy(receiverBulk);
