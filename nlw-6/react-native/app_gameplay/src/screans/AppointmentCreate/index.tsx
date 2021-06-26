import React, { useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/database';

import { styles } from './styles';
import { Header } from '../../components/Header';
import CategotySelect from '../../components/CategotySelect';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import GuildIcon from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { BackGround } from '../../components/BackGround';
import { useNavigation } from '@react-navigation/core';


export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuilds, setOpenGuilds] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
	const [day, setDay] = useState('');
	const [mooth, setMonth] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [desc, setDesc] = useState('');
	const navigation = useNavigation();

	function handleOpenGuilds() {
		setOpenGuilds(true);
	}
	function handleGuildSelected(guildSelect: GuildProps) {
		setGuild(guildSelect)
		setOpenGuilds(false)
	}
	function handleCloseGuilds() {
		setOpenGuilds(false);
	}
	function handleCategorySelect(categoryId: string) {
		setCategory(categoryId);
	}
	async function handleSave() {
		const newAppointment = {
			id: uuid.v4(),
			guild,
			category,
			date: `${day}/${mooth} às ${hour}:${minute}h`,
			description: desc
		}
		const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		//recuperar antes pra depois salvar
		const appointments = storage ? JSON.parse(storage) : [];

		await AsyncStorage.setItem(
			COLLECTION_APPOINTMENTS,
			JSON.stringify([...appointments, newAppointment])
		);
		navigation.navigate('Home')
	}
	return (

		<BackGround>
			<KeyboardAvoidingView
				behavior={'height'}
				style={styles.container}
			>
				<ScrollView>
					<Header
						title="Agendar Partida"
					/>
					<Text style={[styles.label, { marginLeft: 24, marginTop: 18, marginBottom: 18 }]}>
						Categoria
					</Text>
					<CategotySelect
						hasCheckBox
						setCategory={handleCategorySelect}
						categorySelected={category}
					/>
					<View style={styles.form}>
						<RectButton
							onPress={handleOpenGuilds}
						>
							<View style={styles.select}>
								{
									guild.icon ?
										<GuildIcon
											guildId={guild.id}
											iconId={guild.icon}
										/> :
										<View style={styles.image} />
								}
								<View style={styles.selectBody}>
									<Text style={styles.label}>

										{
											guild.name ? guild.name : "Selecione um servidor"
										}
									</Text>
								</View>
								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>

						<View style={styles.field}>
							<View>
								<Text style={[
									styles.label,
									{ marginBottom: 8 }
								]}>
									Dia e mês
								</Text>
								<View style={styles.column}>
									<SmallInput
										maxLength={2}
										onChangeText={setDay}
									/>
									<Text style={styles.divider}>
										/
									</Text>
									<SmallInput maxLength={2} onChangeText={setMonth} />
								</View>
							</View>
							<View>
								<Text style={[
									styles.label,
									{ marginBottom: 8 }
								]}>
									Hora e minuto
								</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} onChangeText={setHour} />
									<Text style={styles.divider}>
										:
									</Text>
									<SmallInput maxLength={2} onChangeText={setMinute} />
								</View>
							</View>
						</View>

						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>
								Descrição
							</Text>
							<Text style={styles.CharsLimit}>
								Max 100 caracteres
							</Text>
						</View>
						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
							onChangeText={setDesc}
						/>
						<View style={styles.footer}>
							<Button
								title="Agendar"
								onPress={handleSave}
							/>
						</View>
					</View>
				</ScrollView>
				<ModalView visible={openGuilds} closeModal={handleCloseGuilds}>
					<Guilds
						handleGuildSelected={handleGuildSelected}
					/>
				</ModalView>
			</KeyboardAvoidingView>
		</BackGround>
	);
}
