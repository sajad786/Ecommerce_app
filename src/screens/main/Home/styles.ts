import { StyleSheet } from 'react-native';
import { ThemeType, Colors, commonColors } from '@/styles/colors';
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
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listContainer: {
            padding: moderateScale(8),
            paddingBottom: moderateScale(100), // padding for bottom tab bar
        },
        searchContainer: {
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(8),
        },
        searchInput: {
            height: moderateScale(48),
            backgroundColor: colors.inputBackground,
            borderRadius: moderateScale(24),
            paddingHorizontal: moderateScale(16),
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            textAlign: isRTL ? 'right' : 'left',
        },
        categoriesContainer: {
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(8),
        },
        categoryPill: {
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(8),
            borderRadius: moderateScale(20),
            backgroundColor: colors.inputBackground,
            marginHorizontal: moderateScale(4),
            borderWidth: 1,
            borderColor: colors.inputBorder,
        },
        categoryPillSelected: {
            backgroundColor: commonColors.primary,
            borderColor: commonColors.primary,
        },
        categoryText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
        },
        categoryTextSelected: {
            color: commonColors.white,
        },
        footerLoader: {
            paddingVertical: moderateScale(20),
            alignItems: 'center',
        },
        leftComponentText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;