import * as dotenv from 'dotenv';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ReceiverService } from '@services/notifications/receiver/receiver.service';
import schema from './schema';

dotenv.config();

const receiver: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  _event,
  _context,
) => {
  console.log('Receiving email to send');
  const response = await new ReceiverService().pushMessage(_event.body);
  console.log('Email was sent to sqs');
  return {
    message: { ...response },
  };
};

export const main = middyfy(receiver);
