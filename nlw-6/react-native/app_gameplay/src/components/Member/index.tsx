import React from 'react';
import {
	View,
	Text
} from 'react-native';

import { styles } from './styles';
import { Avatar } from '../Avatar';
import { theme } from '../../global/styles/theme';

export interface MembersProps {
	id: string;
	username: string;
	avatar_url: string;
	status: string;
}

interface Props {
	data: MembersProps;
}

export function Member({ data }: Props) {
	return (
		<View style={styles.container}>
			<Avatar
				urlImage={data.avatar_url}
			/>
			<View>
				<Text style={styles.title}>
					{data.username}
				</Text>
				<View style={styles.status}>

					<View
						style={[
							styles.bulletStatus,
							{
								backgroundColor: data.status === 'online' ? theme.colors.on : theme.colors.primary
							}
						]}
					/>

					<Text style={styles.nameStatus}>
						{data.status === 'online' ? 'Dísponível' : 'Ocupado'}
					</Text>
				</View>
			</View>
		</View>
	);
}
