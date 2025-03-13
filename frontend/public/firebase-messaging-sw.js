// Firebase Service Worker para notificaciones push
// Basado en la documentación de Firebase: https://firebase.google.com/docs/cloud-messaging/js/client

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas',
  authDomain: 'souldream-ai.firebaseapp.com',
  projectId: 'souldream-ai',
  storageBucket: 'souldream-ai.appspot.com',
  messagingSenderId: '103953800507',
  appId: '1:103953800507:web:5ee111b8bc8c8b0a2a5a5a'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e. in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: payload.data?.tag || 'default',
    data: payload.data,
    actions: [
      {
        action: 'view',
        title: 'Ver'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click Received.');

  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) {
        let url = event.notification?.data?.url || '/dashboard/notifications';
        return clients.openWindow(url);
      }
    })
  );
}); 