import { UserResponse } from '@core/store/user.interfaces';

export type AttachmentListType = {
  attachment: string;
  text: string;
};

export interface Comment {
  id: string;
  comentOwner: UserResponse;
  date: string;
  hour: string;
  eventId: number;
  attachmentList: AttachmentListType;
  // replyToComment:
}
