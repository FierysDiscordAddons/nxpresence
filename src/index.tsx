import { get, subscribe } from 'enmity/api/settings';
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React, Toasts } from 'enmity/metro/common';
import Settings from './components/settings';
import Manifest from './manifest.json';
import { setupPresenceStream } from './stream';

const nxPresence: Plugin = {
   ...Manifest,

   onStart() {
      if (!get(Manifest.name, 'presenceUrl')) {
         console.log('User has no presence URL set')
         return Toasts.open({ content: 'Set your presence URL for nxpresence!' })
      }

      subscribe(Manifest.name, ({ setting, value }) => {
         if (setting === 'presenceUrl') {
            if (this.presence) {
               console.log('presenceUrl updated, closing event stream')
               this.presence.close()
            }

            console.log('presenceUrl updated, setting up event stream')
            this.presence = setupPresenceStream(value + '/events')
         }
      })

      console.log('User has a presence URL set, setting up event stream')
      this.presence = setupPresenceStream(get(Manifest.name, 'presenceUrl') + '/events')
   },

   onStop() {
      if (this.presence) {
         console.log('Plugin stopped, closing event stream')
         this.presence.close()
      }
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(nxPresence);
