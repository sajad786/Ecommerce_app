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
        listContent: {
            paddingVertical: moderateScale(16),
            paddingBottom: moderateScale(20),
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
        checkoutContainer: {
            backgroundColor: colors.surface,
            padding: moderateScale(20),
            borderTopLeftRadius: moderateScale(24),
            borderTopRightRadius: moderateScale(24),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,
        },
        breakdownTitle: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
            color: colors.text,
            marginBottom: moderateScale(12),
            textAlign: isRTL ? 'right' : 'left',
        },
        priceRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            marginBottom: moderateScale(8),
        },
        priceLabel: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
        },
        priceValue: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
        divider: {
            height: 1,
            backgroundColor: colors.inputBorder,
            marginVertical: moderateScale(12),
        },
        totalLabel: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
            color: colors.text,
        },
        totalValue: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.bold,
            color: colors.text,
        },
        checkoutBtn: {
            backgroundColor: commonColors.primary,
            borderRadius: moderateScale(24),
            height: moderateScale(48),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: moderateScale(20),
            marginBottom: moderateScale(10), // Accounts for safe area/bottom tab
        },
        checkoutText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
            color: commonColors.white,
        },
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;
