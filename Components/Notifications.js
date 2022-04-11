import PushNotificationIOS from '@react-native-community/push-notification-ios';

const PushNotification = (title , message ) => {
    PushNotificationIOS.presentLocalNotification({
        alertTitle: title,
        alertBody: message,
    });
};

export { PushNotification } ;