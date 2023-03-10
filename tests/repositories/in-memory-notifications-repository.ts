import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
