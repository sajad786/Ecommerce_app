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
        filterContainer: {
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(8),
            flexDirection: 'column',
            gap: moderateScale(12),
            borderBottomWidth: 1,
            borderBottomColor: colors.inputBorder,
        },
        searchInput: {
            height: moderateScale(40),
            backgroundColor: colors.inputBackground,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(16),
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            textAlign: isRTL ? 'right' : 'left',
        },
        sortButton: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBackground,
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(8),
            borderRadius: moderateScale(20),
            alignSelf: 'flex-start',
            borderWidth: 1,
            borderColor: colors.inputBorder,
        },
        sortText: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
            color: colors.text,
            marginHorizontal: moderateScale(6),
        },
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;
