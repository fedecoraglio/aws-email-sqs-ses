import { SQSHandler } from 'aws-lambda';
import { SenderService } from '@services/notifications/sender/sender.service';

const sender: SQSHandler = async (_event) => {
  console.log('Starting sending email');
  await new SenderService().sendNotification(_event);
  console.log('Leaving sending email');
};

export const main = sender;
