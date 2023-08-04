import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SendNotification } from '@app/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModelMapper } from '../view-models-mapper/notification-view-model-mapper';
import { CountRecipientNotification } from '@app/usecases/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotifications: CountRecipientNotification,
  ) {}

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModelMapper.toHTTP(notification) };
  }
}
