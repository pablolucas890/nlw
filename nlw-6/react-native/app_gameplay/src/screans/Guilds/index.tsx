import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	FlatList
} from 'react-native';

import ListDivider from '../../components/ListDivider';
import { Guild, GuildProps } from '../../components/Guild';
import { styles } from './styles';
import { Load } from '../../components/Load'
import { api } from '../../services/api';

interface Props {
	handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelected }: Props) {

	const [guilds, setGuilds] = useState<GuildProps[]>([]);
	const [loading, setLoading] = useState(true);

	async function fetchGuilds() {
		const response = await api.get('/users/@me/guilds');
		setGuilds(response.data);
		setLoading(false);
	}
	useEffect(() => {
		fetchGuilds();
	}, [])
	return (
		<View style={styles.container}>
			{loading
				?
				<Load />
				:
				<FlatList
					data={guilds}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Guild
							data={item}
							onPress={() => handleGuildSelected(item)}
						/>
					)}
					ItemSeparatorComponent={() => <ListDivider isCentered />}
					ListHeaderComponent={() => <ListDivider isCentered />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 60, paddingTop: 104 }}
					style={styles.guilds}
				/>
			}
		</View>

	);
}
