import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@app/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { GetRecipientNotifications } from '@app/usecases/get-recipients-notifications';
import { CountRecipientNotification } from '@app/usecases/count-recipient-notifications';
import { UnreadNotification } from '@app/usecases/unread-notification';
import { ReadNotification } from '@app/usecases/read-notification';
import { CancelNotification } from '@app/usecases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    CountRecipientNotification,
    UnreadNotification,
    ReadNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
