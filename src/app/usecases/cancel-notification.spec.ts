import { InMemoryNotificationsRepository } from '@app/repositories/in-memory/In-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
// import { makeNotification } from '../../../tests/factories/notification-factory';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'recipient-1',
      content: new Content('this is a notification'),
      category: 'Social',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
