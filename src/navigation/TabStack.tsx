import { HomeIcon, HomeInactiveIcon, ProfileInactiveIcon, SettingsIcon } from '@/assets/icons';
import {
    Home,
    Profile,
    Settings,
    Cart,
    Favourites,
    ProductDetails
} from '@/screens';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MyTabBar from './MyTabBar';
import { MainStackParamList } from './types';
import { useTheme } from '@/context/ThemeContext';
import Svg, { Path, Circle } from 'react-native-svg';

const Tab = createBottomTabNavigator<MainStackParamList>();

const CartIcon = ({ color, focused }: { color: string, focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="9" cy="21" r="1" />
        <Circle cx="20" cy="21" r="1" />
        <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Svg>
);

const HeartIcon = ({ color, focused }: { color: string, focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

export const TabStack = () => {

    const { theme } = useTheme();
    const colors = Colors[theme];

    const screenOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
        tabBarStyle: {
            borderTopWidth: 1,
        },
    };

    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            id={undefined}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? <HomeIcon color={color} /> : <HomeInactiveIcon color={color} />
                    ),
                }} />
            <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <CartIcon color={color} focused={focused} />
                    ),
                }} />
            <Tab.Screen name="Favourites" component={Favourites}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <HeartIcon color={color} focused={focused} />
                    ),
                }} />
            {/* <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, focused }) => (
          focused ? <ProfileInactiveIcon color={color} /> : <ProfileInactiveIcon color={color} />
        ),
      }} /> */}
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color }) => (
                    <SettingsIcon fill={colors.text} width={20} height={20} />
                )
            }} />

        </Tab.Navigator>
    );
}; 