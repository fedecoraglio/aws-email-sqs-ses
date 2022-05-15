import { SQS } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { AppError } from '../../../libs/app-error';
import { MailService } from '../../mail/mail.service';
import { MessageBulkResponseDto } from '../dtos/message-bulk-response.dto';
import { MessageResponseDto } from '../dtos/message-response.dto';

dotenv.config();

export class ReceiverService {
  private readonly sqs = new SQS({ region: process.env.REGION });
  private readonly queueUrl = process.env.QUEUE_URL;
  private readonly mailService = new MailService();

  async pushMessage(body: any): Promise<MessageResponseDto | null> {
    let resp = null;
    try {
      console.log('Receiving new message to add to the queue');
      // it throw an exception when the template was not found.
      await this.mailService.getTemplateInfo(body.templateName);
      resp = await this.sqs
        .sendMessage({
          MessageBody: JSON.stringify(body),
          QueueUrl: this.queueUrl,
        })
        .promise();
    } catch (err) {
      console.error('Error adding message to the queue url' + this.queueUrl);
      throw new AppError(
        err.message || 'Error sending notification',
        err.statusCode || 400,
      );
    }
    return resp;
  }

  async pushBulkMessage(body: any): Promise<MessageBulkResponseDto> {
    let resp: MessageBulkResponseDto = { listOfMessageNotProcessing: [] };
    try {
      console.log(`Receiving ${body.messages.length} messages`);
      for (let message of body.messages) {
        try {
          await this.mailService.getTemplateInfo(message.templateName);
          await this.sqs
            .sendMessage({
              MessageBody: JSON.stringify(message),
              QueueUrl: this.queueUrl,
            })
            .promise();
        } catch (err) {
          console.error(
            `Error adding ${message.destinationEmail} - ${message.templateName}`,
          );
          resp.listOfMessageNotProcessing.push({ ...message });
        }
      }
    } catch (err) {
      console.error(`Error adding message to the sqs ${JSON.stringify(err)}`);
      throw new AppError(
        err.message || 'Error sending notification',
        err.statusCode || 400,
      );
    }
    return resp;
  }
}
