import React, { } from 'react';
import { View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
interface Props extends RectButtonProps {
	title: string;
	icon: React.FC<SvgProps>;
	checked?: boolean;
}

export default function Category({
	title,
	icon: Icon,
	checked,
	...rest
}: Props) {
	return (
		<RectButton
			{...rest}
		>
			<LinearGradient
				style={styles.container}
				colors={[theme.colors.secondary40, theme.colors.secondary70]}
			>
				<View
					
				>

				</View>
			</LinearGradient>
		</RectButton>
	);
}
