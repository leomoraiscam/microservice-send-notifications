import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@app/repositories/in-memory/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { Content } from '@app/entities/content';
import { makeNotification } from 'tests/factories/notification-factory';

describe('Count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-3',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
