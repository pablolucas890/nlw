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

export function Home() {
	const [category, setCategory] = useState('');
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
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd />
			</View>
			<View>
				<CategotySelect
					categorySelected={category}
					setCategory={handleCategorySelect}
				/>

				<View style={styles.content}>
					<ListHeader
						title="Partidas agendadas"
						subTitle="Total 6"
					/>
					<FlatList
						data={appointments}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<Appointment
								data={item}
							/>
						)}
						ItemSeparatorComponent={() => <ListDivider /> }
						style={styles.matches}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</View>
	);
}
