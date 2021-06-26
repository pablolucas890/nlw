import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    image: {
		width: 60,
		height: 63,
    },
	container:{
		width: 60,
		height: 63,
		borderRadius: 8,
		backgroundColor: theme.colors.discord,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	}
})
