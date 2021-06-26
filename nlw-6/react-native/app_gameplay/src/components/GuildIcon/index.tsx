import React, { } from 'react';
import {
	View,
	Image
} from 'react-native';
import { CDN_ID } from '../../config';
import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg'

interface Props {
	guildId: string;
	iconId: string | null;
}

export default function GuildIcon({ iconId, guildId }: Props) {

	const uri = `${CDN_ID}/icons/${guildId}/${iconId}.png`

	return (
		<View style={styles.container}>
			{
				iconId
					?
					<Image
						style={styles.image}
						source={{ uri }}
						resizeMode="cover"
					/>
					:
					<DiscordSvg 
						width={40}
						height={40}
					/>
		}
		</View>
	);
}
