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
import { AuthIllustration } from '@/assets/svgIcons';

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
