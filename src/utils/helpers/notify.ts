import { message, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import Parser from 'html-react-parser';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (
  type: NotificationType,
  title: string,
  description: string,
  placement: NotificationPlacement = 'bottomRight',
  onClick?: () => void
) => {
  notification[type]({
    message: title,
    description: Parser(description),
    placement,
    duration: 5,
    btn: onClick && 'Đồng ý',
    onClick
  });
  return type;
};
export const notifyWarning = (description: string, placement?: NotificationPlacement) =>
  openNotificationWithIcon('warning', 'Warning Notification', description, placement);
export const notifySuccess = (description: string, placement?: NotificationPlacement) =>
  openNotificationWithIcon('success', 'Successful Notification', description, placement);
export const notifyError = (description: string, placement?: NotificationPlacement) =>
  openNotificationWithIcon('error', 'Failure Notification', description, placement);
export const notifyInfo = (description: string) => openNotificationWithIcon('info', 'Thông báo', description);

export const alertMessage = (type: 'error' | 'success' | 'warning', messageContent: string) => {
  message[type](messageContent);
};
export default openNotificationWithIcon;
