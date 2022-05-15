import { MessageRequestDto } from './message-request.dto';

export class MessageBulkResponseDto {
  listOfMessageNotProcessing: MessageRequestDto[];
}
