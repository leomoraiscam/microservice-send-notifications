import { Notification } from '@application/entities/notifications';

export class NotificationViewModelMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
