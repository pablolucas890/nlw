import React, { } from 'react';
import {
	Text,
	ImageBackground,
	View,
	FlatList
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import bannerSVG from '../../assets/banner.png'
import ListHeader from '../../components/ListHeader';
import { Member } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
	const members = [
		{
			id: '1',
			username: 'Rodrigo',
			avatar_url: 'https://github.com/pablolucas890.png',
			status: 'online'
		},
		{
			id: '2',
			username: 'Pablo',
			avatar_url: 'https://github.com/pablolucas890.png',
			status: 'offline'
		},

	]
	return (
		<View style={styles.container}>
			<Header
				title="Detalhes"
				action={
					<BorderlessButton>
						<Fontisto
							name="share"
							size={24}
							color={theme.colors.primary}
						/>
					</BorderlessButton>
				}
			/>

			<ImageBackground
				source={bannerSVG}
				style={styles.banner}
			>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>
						Lendários
					</Text>
					<Text style={styles.subTitle}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi optio dicta nisi quidem volupt
					</Text>
				</View>

			</ImageBackground>
			<ListHeader
				title="Jogadores"
				subTitle="Total 3"
			/>
			<FlatList
				data={members}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Member
						data={item}
					/>
				)}
				ItemSeparatorComponent={() => <ListDivider />}
				style={styles.members}
			/>
			<View style={styles.footer}>
				<ButtonIcon
					title="Entrar na Partida"
				/>
			</View>
		</View>
	);
}
