import React, { ReactNode } from 'react';
import {

} from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

interface Props {
	children: ReactNode;
}

export function BackGround({ children }: Props) {

	return (
		<LinearGradient
			style={styles.container}
			colors={[theme.colors.secondary80, theme.colors.secondary100]}
		>
			{children}
		</LinearGradient>
	)
}
