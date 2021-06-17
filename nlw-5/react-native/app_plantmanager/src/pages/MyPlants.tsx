import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { Header } from "../components/Header";
import colors from "../styles/colors";
import waterDropImg from '../assets/waterdrop.png';
import { useState } from "react";
import { LoadPlants, PlantProps } from "../libs/storage";
import { useEffect } from "react";
import { format } from "date-fns";
import { formatDistance } from "date-fns/esm";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import { PlantCardSecondary } from "../components/PlantCardSecondary";


export function MyPlants() {
    const [myPlants, SetMyPlants] = useState<PlantProps[]>();
    const [loading,setLoading] = useState(true);
    const [nextWatered,setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStorage =  await LoadPlants();

            const nextTime = formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime} horas`
            )

            SetMyPlants(plantsStorage);
        }

        loadStorageData();
    })
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotLight}>
                <Image 
                    source={waterDropImg}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {nextWatered}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 60,
        height: 60
    },
    text:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
}
)