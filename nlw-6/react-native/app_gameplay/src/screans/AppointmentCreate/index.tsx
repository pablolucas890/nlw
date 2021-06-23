import React, { useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

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

export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuilds, setOpenGuilds] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleOpenGuilds() {
		setOpenGuilds(true);
	}

	function handleGuildSelected(guildSelect: GuildProps) {
		setGuild(guildSelect)
		setOpenGuilds(false)
	}

	return (
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
					setCategory={setCategory}
					categorySelected={category}
				/>
				<View style={styles.form}>
					<RectButton
						onPress={handleOpenGuilds}
					>
						<View style={styles.select}>
							{
								guild.icon ?
									<GuildIcon /> :
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
							<Text style={styles.label}>
								Dia e mês
							</Text>
							<View style={styles.column}>
								<SmallInput maxLength={2} />
								<Text style={styles.divider}>
									/
								</Text>
								<SmallInput maxLength={2} />
							</View>
						</View>
						<View>
							<Text style={styles.label}>
								Hora e minuto
							</Text>
							<View style={styles.column}>
								<SmallInput maxLength={2} />
								<Text style={styles.divider}>
									:
								</Text>
								<SmallInput maxLength={2} />
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
					/>
					<View style={styles.footer}>
						<Button
							title="Agendar"
						/>
					</View>
				</View>
			</ScrollView>
			<ModalView visible={openGuilds}>
				<Guilds
					handleGuildSelected={handleGuildSelected}
				/>
			</ModalView>
		</KeyboardAvoidingView>

	);
}
