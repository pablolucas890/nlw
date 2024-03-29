import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: 104,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginRight: 8
	},
	content: {
		width: 100,
		height: 116,
		alignItems: 'center',
		borderRadius: 8,
		justifyContent: 'space-between',
		paddingVertical: 20
	},
	title: {
		fontFamily: theme.fonts.title700,
		fontSize: 15,
		color: theme.colors.heading,
		marginTop: 15
	},
	check: {
		width: 12,
		height: 12,
		backgroundColor: theme.colors.secondary100,
		position: 'absolute',
		top: 7,
		right: 7,
		borderColor: theme.colors.secondary50,
		borderWidth: 2,
		borderRadius: 3
	},
	checked: {
		width: 10,
		height: 10,
		position: 'absolute',
		top: 7,
		right: 7,
		backgroundColor: theme.colors.primary,
		borderRadius: 3
	}
})
