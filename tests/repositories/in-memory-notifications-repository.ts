import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { Notification } from '../../src/app/entities/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
