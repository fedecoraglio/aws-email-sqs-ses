import { SES } from 'aws-sdk';
import * as dotenv from 'dotenv';

import { AppError } from '../../libs/app-error';
import { MessageRequestDto } from '../notifications/dtos/message-request.dto';

dotenv.config();

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const AWS_SES = new SES(SES_CONFIG);

export class MailService {
  async getTemplateInfo(
    templateName: string,
  ): Promise<SES.Types.GetTemplateResponse | null> {
    let templateInfo: SES.Types.GetTemplateResponse = null;
    try {
      templateInfo = await AWS_SES.getTemplate({
        TemplateName: templateName,
      }).promise();
    } catch (err) {
      console.error('Error getting template. Msg: ' + JSON.stringify(err));
      throw new AppError(
        err.message || 'Template not found',
        err.statusCode || 400,
      );
    }

    return templateInfo;
  }

  sendTemplateEmail(requestMessage: MessageRequestDto) {
    try {
      const params: SES.Types.SendTemplatedEmailRequest = {
        Source: process.env.SOURCE_MAIL || 'federicocoraglio@gmail.com',
        Template: requestMessage.templateName,
        Destination: {
          ToAddresses: [requestMessage.destinationEmail],
        },
        TemplateData: JSON.stringify(requestMessage.templateData),
      };
      return AWS_SES.sendTemplatedEmail(params).promise();
    } catch (err) {
      console.error('Error sending template email', JSON.stringify(err));
      throw 'Error sending template email';
    }
  }
}
