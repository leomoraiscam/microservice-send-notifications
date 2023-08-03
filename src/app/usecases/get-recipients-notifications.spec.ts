import { InMemoryNotificationsRepository } from '@app/repositories/in-memory/In-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipients-notifications';
import { makeNotification } from '../../../tests/factories/notification-factory';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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
        recipientId: 'recipient-2',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
