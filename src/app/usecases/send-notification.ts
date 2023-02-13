import { Notification } from '../entities/notifications';
import { NotificationsRepository } from '../repositories/notifications-repository';
interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
