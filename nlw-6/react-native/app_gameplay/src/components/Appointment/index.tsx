import React from 'react';
import {
	View,
	Text
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { styles } from './styles';
import GuildIcon from '../GuildIcon';
import { categories } from '../../utils/categories';
import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'
import { theme } from '../../global/styles/theme';

export interface GuildProps {
	id: string,
	icon: null,
	owner: boolean;
	name: string;
}

export interface AppointmentsProps {
	id: string;
	guild: GuildProps;
	category: string;
	date: string;
	description: string;
}

interface Props extends RectButtonProps {
	data: AppointmentsProps
}

export function Appointment({ data, ...rest }: Props) {
	const [category] = categories.filter(item => item.id == data.category)

	return (
		<RectButton {...rest}>
			<View style={styles.container}>
				<GuildIcon />
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>
							{data.guild.name}
						</Text>
						<Text style={styles.category}>
							{category.title}
						</Text>
					</View>

					<View style={styles.footer}>
						<View style={styles.dateInfo}>
							<CalendarSvg />
							<Text style={styles.date}>
								{data.date}
							</Text>
						</View>
						<View style={styles.playerInfo}>
							<PlayerSvg
								fill={data.guild.owner ? theme.colors.primary : theme.colors.on}
							/>
							<Text
								style={[
									styles.player,
									{ color: data.guild.owner ? theme.colors.primary : theme.colors.on }
								]}
							>
								{data.guild.owner ? "Anfitrião" : "Visitante"}s
							</Text>
						</View>
					</View>

				</View>
			</View>
		</RectButton>
	)
}
