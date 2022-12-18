import { FormInput, FormRow, FormSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
	settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
	return <FormSection title="nxapi">
		<FormInput
			value={settings.get('presenceUrl')}
			onChange={(value) => settings.set('presenceUrl', value)}
			title="Presence URL"
		/>
	</FormSection>;
};
