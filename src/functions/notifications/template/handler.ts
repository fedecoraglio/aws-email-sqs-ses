import * as dotenv from 'dotenv';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AppError } from '@libs/app-error';
import { MailService } from '@services/mail/mail.service';
import schema from './schema';

dotenv.config();

const template: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
  _context,
) => {
  console.log('Starting template handler');
  if (!event.queryStringParameters || !event.queryStringParameters.name) {
    throw new AppError('Name parameter is required', 400);
  }
  const templateName = event.queryStringParameters.name;
  const response = await new MailService().getTemplateInfo(templateName);

  console.log('Leaving template handler');
  return {
    message: { ...response },
  };
};

export const main = middyfy(template);
