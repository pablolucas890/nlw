import React, { ReactNode } from 'react';
import {
	View,
	Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';


import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
	title: string;
	action?: ReactNode;
}

export function Header({ title, action }: Props) {

	const navigation = useNavigation();

	function handleGoBack() {
		navigation.navigate('Home')
	}
	return (
		<LinearGradient
			colors={[theme.colors.secondary100, theme.colors.secondary40]}
			style={styles.container}
		>
			<BorderlessButton
				onPress={handleGoBack}
			>
				<Feather
					name='arrow-left'
					size={24}
					color={theme.colors.heading}
				/>
			</BorderlessButton>
			<Text style={styles.title}>
				{title}
			</Text>
			{
				action &&
				<View>
					{action}
				</View>
			}
		</LinearGradient>
	);
}
