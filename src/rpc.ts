import { getModule } from "enmity/metro";

const { SET_ACTIVITY } = getModule(m => typeof m.SET_ACTIVITY === 'object')

export function setActivity(activity) {
	return SET_ACTIVITY.handler({
		isSocketConnected: () => true,
		socket: {
			id: 100,
			application: {
				id: "1004443008307044452",
				name: activity.name,
			},
			transport: 'ipc',
		},
		args: {
			pid: 10,
			activity: activity,
		},
	});
}

export function stopActivity() {
	return SET_ACTIVITY.handler({
		isSocketConnected: () => true,
		socket: {
			id: 100,
			application: {
				id: "1004443008307044452",
				name: "nxpresence",
			},
			transport: 'ipc',
		},
		args: {
			pid: 10,
			activity: undefined,
		},
	});
}
