import React, { } from 'react';
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
import { Appointment } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { useNavigation } from '@react-navigation/native';
import { BackGround } from '../../components/BackGround';

export function Home() {
	const [category, setCategory] = useState('');
	const navigation = useNavigation();
	const appointments = [
		{
			id: '1',
			guild: {
				id: '1',
				name: "Lendários",
				icon: null,
				owner: true
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'Lorem impous susu sas dataelite saadaresnt'
		},
		{
			id: '2',
			guild: {
				id: '1',
				name: "Lendários",
				icon: null,
				owner: true
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'Lorem impous susu sas dataelite saadaresnt'
		}
	]
	function handleCategorySelect(categoryId: string) {
		if (categoryId === category) {
			setCategory('');
		} else {
			setCategory(categoryId);
		}
	}
	function handleApointmentDetails() {
		navigation.navigate('AppointmentDetails')
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
				<View>
					<CategotySelect
						categorySelected={category}
						setCategory={handleCategorySelect}
					//hasCheckBox={true}
					/>

					<View>
						<ListHeader
							title="Partidas agendadas"
							subTitle="Total 6"
						/>
					</View>
				</View>
				<FlatList
					data={appointments}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Appointment
							data={item}
							onPress={handleApointmentDetails}
						/>
					)}
					ItemSeparatorComponent={() => <ListDivider />}
					style={styles.matches}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 60 }}
				/>
			</View>
		</BackGround>
	);
}
