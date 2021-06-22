import React, { } from 'react';
import { View, Text } from 'react-native'
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
					style={[
						styles.content,
						{ opacity: checked ? 1 : 0.4 }
					]}
				>
					<View style={checked ? styles.checked : styles.check} />
					<Icon
						width={48}
						height={48}
					/>
					<Text style={styles.title}>
						{title}
					</Text>
				</View>
			</LinearGradient>
		</RectButton>
	);
}
