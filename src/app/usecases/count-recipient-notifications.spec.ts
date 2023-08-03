import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@app/repositories/in-memory/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { Content } from '@app/entities/content';

describe('Count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        recipientId: 'recipient-1',
        content: new Content('this is a notification'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        recipientId: 'recipient-1',
        content: new Content('this is a notification'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        recipientId: 'recipient-3',
        content: new Content('this is a notification'),
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
