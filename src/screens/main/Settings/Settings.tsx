import React, { useState } from 'react';
import { View, Pressable, Switch, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import { useTheme } from '@/context/ThemeContext';
import { Colors, commonColors } from '@/styles/colors';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { RootState } from '@/redux/reducers';
import { changeThemeState, changeLanguageState } from '@/redux/actions/settings';
import { clearDataAction } from '@/redux/actions/auth';
import Svg, { Path, Circle } from 'react-native-svg';
import { moderateScale } from '@/styles/scaling';

interface SettingsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const MoonIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Svg>
);

const GlobeIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
);

const LogoutIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Svg>
);

const SettingsScreen = () => {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];
    const dispatch = useDispatch();

    const { defaultLanguage, defaultTheme } = useSelector((state: RootState) => state.settings);

    const isDarkMode = defaultTheme.myTheme === 'dark';

    const handleThemeToggle = () => {
        changeThemeState(isDarkMode ? 'light' : 'dark');
    };

    const handleLanguageToggle = () => {
        const newLang = defaultLanguage.sortName === 'en' 
            ? { name: 'Arabic', sortName: 'ar' }
            : { name: 'English', sortName: 'en' };
        changeLanguageState(newLang);
    };

    const handleLogout = () => {
        Alert.alert(
            t('LOGOUT'),
            t('LOGOUT_CONFIRMATION'),
            [
                { text: t('CANCEL'), style: 'cancel' },
                { 
                    text: t('LOGOUT'), 
                    style: 'destructive',
                    onPress: () => {
                        clearDataAction();
                    }
                }
            ]
        );
    };

    return (
        <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('SETTINGS')} />
            <View style={styles.content}>
                <View style={styles.section}>
                    <TextComp text={t('APPEARANCE')} isDynamic style={styles.sectionTitle} />
                    <View style={styles.settingItem}>
                        <View style={styles.itemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.inputBorder }]}>
                                <MoonIcon color={colors.text} />
                            </View>
                            <TextComp text={t('DARK_MODE')} isDynamic style={styles.itemText} />
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={handleThemeToggle}
                            trackColor={{ false: colors.inputBorder, true: commonColors.primary }}
                            thumbColor={colors.surface}
                        />
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <TextComp text={t('PREFERENCES')} isDynamic style={styles.sectionTitle} />
                    <Pressable style={styles.settingItem} onPress={handleLanguageToggle}>
                        <View style={styles.itemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.inputBorder }]}>
                                <GlobeIcon color={colors.text} />
                            </View>
                            <TextComp text={t('LANGUAGE')} isDynamic style={styles.itemText} />
                        </View>
                        <View style={styles.languagePill}>
                            <TextComp 
                                text={defaultLanguage.name} 
                                isDynamic 
                                style={styles.languageText} 
                            />
                        </View>
                    </Pressable>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <TextComp text={t('ACCOUNT')} isDynamic style={styles.sectionTitle} />
                    <Pressable 
                        style={({ pressed }) => [
                            styles.settingItem,
                            pressed && styles.itemPressed
                        ]} 
                        onPress={handleLogout}
                    >
                        <View style={styles.itemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: commonColors.secondary + '20' }]}>
                                <LogoutIcon color={commonColors.secondary} />
                            </View>
                            <TextComp text={t('LOGOUT')} isDynamic style={[styles.itemText, { color: commonColors.secondary }]} />
                        </View>
                    </Pressable>
                </View>
            </View>
        </WrapperContainer>
    );
};

export default SettingsScreen;
