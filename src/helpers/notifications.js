import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const UDACICARDS_NOTIFICATIONS_KEY = 'UdaciCards:notifications';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(UDACICARDS_NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    android: {
      priority: 'high',
      sound: true,
      sticky: false,
      vibrate: true,
    },
    body: "👋 remember to study your cards today!",
    ios: {
      sound: true,
    },
    title: 'Would now be a great time to learn?',
  };
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(UDACICARDS_NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(9);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(UDACICARDS_NOTIFICATIONS_KEY, JSON.stringify(true));
            }
          });
      }
    });
};
