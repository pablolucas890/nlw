import React, { } from 'react';
import {
	Text,
	View,
	Image,
	StatusBar,
} from 'react-native';
import { styles } from './styles';
import { Profile } from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategotySelect from '../../components/CategotySelect';

export function Home() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd />
			</View>
			<View>
				<CategotySelect />
			</View>
		</View>
	);
}
