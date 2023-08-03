import { SendNotification } from './send-notification';
import { InMemoryNotificationsRepository } from '../repositories/in-memory/In-memory-notifications-repository';

// const notificationsRepository = {
//   create: jest.fn(),
// };

describe('Notification UseCase', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

  it('should be able to send a notification', async () => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(
      inMemoryNotificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'Voce recebeu uma solicitacao de amizade',
      category: 'social',
      recipientId: 'fake-id',
    });

    expect(inMemoryNotificationsRepository.notifications[0]).toBe(notification);
  });
});
