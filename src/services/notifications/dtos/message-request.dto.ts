export class MessageRequestDto {
  destinationEmail: string;
  templateName: string;
  templateData: object;

  constructor(data: {
    destinationEmail: string;
    templateName: string;
    templateData: object;
  }) {
    Object.assign(this, data);
  }
}
