import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import Manifest from './manifest.json';
import { setActivity, stopActivity } from './rpc';

const EventSource = NativeEventSource || EventSourcePolyfill;

export function setupPresenceStream(url: string) {
	let presenceStream = new EventSource(url, { headers: { 'User-Agent': `nxpresence / ${Manifest.version} (Enmity)` } });

	// gets called on presence change
	presenceStream.addEventListener('friend', (event) => {
		const data = JSON.parse(event.data);
		const presence = data.presence

		// No presence if user isn't in a game
		if (presence.state in ["INACTIVE", "OFFLINE"]) {
			console.log('Stopping activity')
			stopActivity()
		}

		console.log('Setting activity')
		setActivity({
			name: presence.game.name,
			type: 0,
			created_at: presence.updatedAt,
			timestamps: {
				start: 0
			},
			assets: {
				large_image: presence.game.imageUri
			}
		})
	});

	presenceStream.addEventListener('close', (event) => {
		console.log('Event stream closed, stopping activity')
		stopActivity()
	});

	return presenceStream;
}
