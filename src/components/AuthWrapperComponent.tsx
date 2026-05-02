import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { changeFirstTime } from '@/redux/reducers/auth';
import TextComp from './TextComp';
import ButtonComp from './ButtonComp';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { Colors, commonColors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

import Svg, { Circle, Path, Rect } from 'react-native-svg';

const AuthIllustration = ({ primaryColor, textColor }: { primaryColor: string, textColor: string }) => (
    <Svg width="140" height="140" viewBox="0 0 120 120" fill="none">
        <Circle cx="60" cy="60" r="50" fill={primaryColor} fillOpacity="0.08" />
        <Circle cx="60" cy="60" r="35" fill={primaryColor} fillOpacity="0.15" />
        <Rect x="42" y="55" width="36" height="26" rx="4" fill={primaryColor} />
        <Path d="M48 55V46a12 12 0 0 1 24 0v9" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <Circle cx="60" cy="68" r="3" fill="#ffffff" />
        <Path d="M60 71v5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        {/* Subtle decorative sparkles */}
        <Path d="M25 35l3 3m0-3l-3 3" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
        <Path d="M95 40l2 2m0-2l-2 2" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
        <Path d="M85 90l3 3m0-3l-3 3" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
    </Svg>
);

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapperComponent = ({ children }: AuthWrapperProps) => {
    const { auth_token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const colors = Colors[theme];
    const isAuthenticated = !!auth_token;

    const handleLoginRedirect = () => {
        // By setting isFirstTime to false, Routes.tsx switches the root navigator back to AuthStack
        dispatch(changeFirstTime(false));
    };

    if (!isAuthenticated) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.illustrationContainer}>
                    <AuthIllustration primaryColor={commonColors.primary} textColor={colors.text} />
                </View>
                <TextComp
                    isDynamic={true}
                    text={t('LOGIN_REQUIRED_MESSAGE')}
                    style={[styles.message, { color: colors.text }]}
                />
                <ButtonComp
                    title={t('GO_TO_LOGIN')}
                    onPress={handleLoginRedirect}
                    style={styles.button}
                />
            </View>
        );
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(24),
    },
    illustrationContainer: {
        marginBottom: moderateScale(32),
    },
    message: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
        marginBottom: moderateScale(24),
        textAlign: 'center',
    },
    button: {
        width: '100%',
    }
});

export default AuthWrapperComponent;
