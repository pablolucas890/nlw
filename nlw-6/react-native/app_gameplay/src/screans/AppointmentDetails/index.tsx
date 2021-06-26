import React, { } from 'react';
import {
	Text,
	ImageBackground,
	View,
	FlatList,
	Share
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import bannerSVG from '../../assets/banner.png'
import ListHeader from '../../components/ListHeader';
import { Member, MembersProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { BackGround } from '../../components/BackGround';
import { GuildProps } from '../../components/Guild';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppointmentsProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { Load } from '../../components/Load';
import * as Linking from 'expo-linking'

interface Params {
	guildSelected: AppointmentsProps;
}

interface GuildWidget {
	id: string;
	name: string;
	instant_invite: string;
	members: MembersProps[];
}
export function AppointmentDetails() {

	const routes = useRoute();
	const { guildSelected } = routes.params as Params;
	const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
	const [loading, setLoading] = useState(true);
	const [loadData, setLoadData] = useState(false);
	const navigation = useNavigation();

	function handleOpenLink() {
		if(widget.instant_invite){
			Linking.openURL(widget.instant_invite)
		}else{
			Alert.alert('O Servidor não tem link de redirecionamento!!')
		}
	}
	function handleMessageInvitation() {
		const message = widget.instant_invite
		message
			?
			Share.share({
				message,
				url: widget.instant_invite
			})
			:
			Alert.alert('O servidor nao tem Invite! =(')
	}
	async function fetchGuildInfo() {
		try {
			const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
			setWidget(response.data)
			setLoadData(true)
		} catch (error) {
			Alert.alert('Verifique as configurações do Server, será que o widget está habilitado?')
			navigation.navigate('Home');
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchGuildInfo();
	})
	return (
		<BackGround>
			<View style={styles.container}>
				<Header
					title="Detalhes"
					action={
						<BorderlessButton
							onPress={handleMessageInvitation}
						>
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
							{guildSelected.guild.name}
						</Text>
						<Text style={styles.subTitle}>
							{guildSelected.description}
						</Text>
					</View>

				</ImageBackground>
				{
					!loading && loadData
						?

						<>
							<ListHeader
								title="Jogadores"
								subTitle={`Total ${widget.members.length}`}
							/>
							<FlatList
								data={widget.members}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<Member
										data={item}
									/>
								)}
								ItemSeparatorComponent={() => <ListDivider isCentered />}
								style={styles.members}
							/>
						</>
						:
						<Load />

				}
				<View style={styles.footer}>
					<ButtonIcon
						title="Entrar na Partida"
						onPress={handleOpenLink}
					/>
				</View>
			</View>
		</BackGround>
	)
}
