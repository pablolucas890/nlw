import React, { useState } from 'react';
import {
	Text,
	View,
	FlatList
} from 'react-native';

import ListDivider from '../../components/ListDivider';
import { Guild } from '../../components/Guild';
import { styles } from './styles';
import { GuildProps } from '../../components/Guild';

interface Props {
	handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelected }: Props) {

	const guilds = [
		{
			id: '1',
			name: 'Lendários',
			icon: 'image.png',
			owner: true
		},
		{
			id: '2',
			name: 'Galera do Game',
			icon: null,
			owner: true
		},
	]
	return (
		<View style={styles.container}>
			<FlatList
				data={guilds}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Guild
						data={item}
						onPress={() => handleGuildSelected(item)}
					/>
				)}
				ItemSeparatorComponent={() => <ListDivider isCentered/>}
				ListHeaderComponent={() => <ListDivider isCentered/>}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{paddingBottom: 60, paddingTop:104}}
				style={styles.guilds}
			/>
		</View>

	);
}
