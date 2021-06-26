import React, { } from 'react';
import {
	View,
	TouchableOpacity,
	TouchableOpacityProps,
	Text
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import GuildIcon from '../GuildIcon';
import { theme } from '../../global/styles/theme';

export interface GuildProps {
	id: string;
	name: string;
	icon: string | null;
	owner: boolean
}

interface Props extends TouchableOpacityProps {
	data: GuildProps
}
export function Guild({ data, ...rest }: Props) {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.7}
			{...rest}
		>
			<GuildIcon 
				guildId={data.id}
				iconId={data.icon}
			/>
			<View style={styles.content}>
				<View>
					<Text style={styles.title}>
						{data.name}
					</Text>
					<Text style={styles.type}>
						{
							data.owner ? "Administrador" : "Convidado"
						}
					</Text>
				</View>
			</View>
			<Feather
				name="chevron-right"
				color={theme.colors.heading}
				siz={24}
			/>
		</TouchableOpacity>
	);
}
