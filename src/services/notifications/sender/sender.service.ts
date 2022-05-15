import { SQSEvent } from 'aws-lambda';
import * as dotenv from 'dotenv';
import { MailService } from '../../mail/mail.service';
import { MessageRequestDto } from '../dtos/message-request.dto';

dotenv.config();

export class SenderService {
  private readonly mailService = new MailService();

  async sendNotification(event: SQSEvent): Promise<boolean> {
    console.log('Starting processMessage method');
    let success = true;
    for (let message of event.Records) {
      try {
        await this.sleep(3000);
        await this.mailService.sendTemplateEmail(
          this.createMessageRequestDto(message.body),
        );
      } catch (err) {
        console.error(`Error sending email. Msg: ${err}`);
        success = false;
      }
    }
    console.log('Leaving processMessage method');
    return success;
  }

  private createMessageRequestDto(body: string) {
    return new MessageRequestDto({
      ...JSON.parse(body),
    });
  }

  private async sleep(millisecond: number) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, millisecond);
    });
  }
}
