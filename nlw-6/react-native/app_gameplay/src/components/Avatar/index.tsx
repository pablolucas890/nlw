import React from 'react';
import {
	View,
	Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	urlImage: string;
}
export function Avatar({ urlImage }: Props) {

	return (
		<LinearGradient
			style={styles.container}
			colors={[theme.colors.secondary40, theme.colors.secondary70]}
		>
			<Image
				source={{uri : urlImage}}
				style={styles.avatar}
			/>
		</LinearGradient>
	)
}
