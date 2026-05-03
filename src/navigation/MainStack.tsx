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
import { CartIcon, HeartIcon } from '@/assets/svgIcons';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack = () => {

  const { t } = useTranslation();
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
          tabBarLabel: t('HOME'),
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeIcon color={color} /> : <HomeInactiveIcon color={color} />
          ),
        }} />
      <Tab.Screen name="Cart" component={Cart}
        options={{
          tabBarLabel: t('CART'),
          tabBarIcon: ({ color, focused }) => (
            <CartIcon color={color} isFilled={focused} />
          ),
        }} />
      <Tab.Screen name="Favourites" component={Favourites}
        options={{
          tabBarLabel: t('FAVOURITES'),
          tabBarIcon: ({ color, focused }) => (
            <HeartIcon color={color} isFilled={focused} size={24} />
          ),
        }} />
      <Tab.Screen name="ProductDetails" component={ProductDetails}
        options={{
          tabBarLabel: t('PRODUCT_DETAILS'),
          tabBarIcon: ({ color, focused }) => (
            <HeartIcon color={color} isFilled={focused} size={24} />
          ),
        }} />
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarLabel: t('SETTINGS'),
        tabBarIcon: ({ color }) => (
          <SettingsIcon fill={colors.text} width={20} height={20} />
        )
      }} />

    </Tab.Navigator>
  );
}; 