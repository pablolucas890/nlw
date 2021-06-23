import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 96,
		paddingHorizontal: 24,
		paddingTop: 25,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontFamily: theme.fonts.title700,
		fontSize: 20,
		color: theme.colors.heading
	}
})
