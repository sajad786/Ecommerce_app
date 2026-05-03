import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import { MainStack } from './MainStack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ActivityIndicator, View } from 'react-native';
import { commonColors } from '@/styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {

    const { isFirstTime } = useSelector((state: RootState) => state.auth);
    const isHydrated = useSelector((state: RootState) => state.auth.isHydrated);

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={commonColors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={isFirstTime ? 'Main' : 'Auth'} screenOptions={{ headerShown: false }} id={undefined}>
                {isFirstTime ? (
                    <Stack.Screen name="Main" component={MainStack} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
