import React, { useCallback } from 'react';
import {
	View,
	FlatList,
	Text
} from 'react-native';
import { styles } from './styles';
import { Profile } from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategotySelect from '../../components/CategotySelect';
import { useState } from 'react';
import ListHeader from '../../components/ListHeader';
import { Appointment, AppointmentsProps } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackGround } from '../../components/BackGround';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { Load } from '../../components/Load';

export function Home() {
	const [category, setCategory] = useState('');
	const navigation = useNavigation();
	const [appointments, setAppointment] = useState<AppointmentsProps[]>([]);
	const [loading, setLoading] = useState(true);

	async function loadAppoitments() {

		const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];
		if (category) {
			setAppointment(storage.filter(item => item.category === category));
		} else {
			setAppointment(storage);
		}
		setLoading(false)
	}
	useFocusEffect(useCallback(() => {
		loadAppoitments();
	}, [category]))
	function handleCategorySelect(categoryId: string) {
		if (categoryId === category) {
			setCategory('');
		} else {
			setCategory(categoryId);
		}
	}
	function handleApointmentDetails(guildSelected: AppointmentsProps) {
		navigation.navigate('AppointmentDetails', {
			guildSelected,
		});
	}
	function handleAppointmentCreate() {
		navigation.navigate('AppointmentCreate')
	}
	return (
		<BackGround>
			<View style={styles.container}>
				<View style={styles.header}>
					<Profile />
					<ButtonAdd onPress={handleAppointmentCreate} />
				</View>
				{
					loading
						?
						<Load />
						:
						<>
							<View>
								<CategotySelect
									categorySelected={category}
									setCategory={handleCategorySelect}
								//hasCheckBox={true}
								/>

								<View>
									<ListHeader
										title="Partidas agendadas"
										subTitle={`Total ${appointments.length}`}
									/>
								</View>
							</View>
							<FlatList
								data={appointments}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<Appointment
										data={item}
										onPress={() => handleApointmentDetails(item)}
									/>
								)}
								ItemSeparatorComponent={() => <ListDivider />}
								style={styles.matches}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ paddingBottom: 60 }}
							/>
						</>
				}
			</View>
		</BackGround>
	);
}
