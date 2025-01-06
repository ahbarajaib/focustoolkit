// src/services/pushNotificationService.ts

export class PushNotificationService {
    private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

    constructor() {
        this.init();
    }

    private async init() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                this.serviceWorkerRegistration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('Service Worker registered successfully.');
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        } else {
            console.warn('Push messaging is not supported.');
        }
    }

    public async subscribeUser() {
        if (!this.serviceWorkerRegistration) {
            console.error('Service Worker is not registered.');
            return;
        }

        try {
            const subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array('<Your Public VAPID Key Here>')
            });
            console.log('User is subscribed:', subscription);
            // Send subscription to your server to save it
        } catch (error) {
            console.error('Failed to subscribe the user:', error);
        }
    }

    public async unsubscribeUser() {
        if (!this.serviceWorkerRegistration) {
            console.error('Service Worker is not registered.');
            return;
        }

        try {
            const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();
                console.log('User is unsubscribed.');
                // Remove subscription from your server
            }
        } catch (error) {
            console.error('Failed to unsubscribe the user:', error);
        }
    }

    private urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}