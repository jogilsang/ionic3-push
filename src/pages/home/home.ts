import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, push: Push) {

    this.init(push)
  }

  init(push) {
    // to check if we have permission
    push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
    }).then(() => console.log('Channel created'));

    // Delete a channel (Android O and above)
    push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // Return a list of currently configured channels
    push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: "570826298644"
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

}
