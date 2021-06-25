import React from 'react';
import {
	Text,
	View,
	Image,
	Alert,
	ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import illustrationIMG from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';
import { BackGround } from '../../components/BackGround';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SingIn() {

	const navigation = useNavigation();
	const { loading, singIn } = useAuth();

	async function handleSingIn() {
		try {
			await singIn();
		} catch (error) {
			Alert.alert(error)
		}
	}

	return (
		<BackGround>
			<View style={styles.container}>
				<Image source={illustrationIMG} style={styles.image} />
				<View style={styles.content}>

					<Text style={styles.title}>
						Conecte-se {'\n'}
						e organize suas{'\n'}
						jogatinas
					</Text>

					<Text style={styles.subTitle}>
						Crie grupos para jogar seus games {'\n'}
						favoritos com seus amigos
					</Text>

					{
						loading
							?
							<ActivityIndicator color={theme.colors.primary} />

							:
							<ButtonIcon
								title="Entrar com Discord"
								activeOpacity={0.3}
								onPress={handleSingIn}
							/>
					}

				</View>
			</View>
		</BackGround>
	);
}
