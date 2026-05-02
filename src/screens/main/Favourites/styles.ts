import { StyleSheet } from 'react-native';
import { ThemeType, Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { useMemo } from 'react';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        listContainer: {
            padding: moderateScale(8),
            paddingBottom: moderateScale(100), // padding for bottom tab bar
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
            marginTop: moderateScale(16),
        },
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;
