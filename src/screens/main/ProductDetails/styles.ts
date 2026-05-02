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
        scrollContent: {
            paddingBottom: moderateScale(100),
        },
        detailsContainer: {
            padding: moderateScale(16),
        },
        titleRow: {
            marginBottom: moderateScale(8),
        },
        title: {
            fontSize: moderateScale(22),
            fontFamily: fontFamily.bold,
            color: colors.text,
            textAlign: isRTL ? 'right' : 'left',
        },
        ratingRow: {
            alignItems: 'center',
            marginBottom: moderateScale(16),
        },
        ratingText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.bold,
            color: colors.text,
            marginHorizontal: moderateScale(4),
        },
        reviewsText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
        },
        divider: {
            height: 1,
            backgroundColor: colors.inputBorder,
            marginVertical: moderateScale(16),
        },
        sectionTitle: {
            fontSize: moderateScale(18),
            fontFamily: fontFamily.bold,
            color: colors.text,
            marginBottom: moderateScale(8),
            textAlign: isRTL ? 'right' : 'left',
        },
        descriptionText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
            lineHeight: moderateScale(22),
            textAlign: isRTL ? 'right' : 'left',
        },
        readMoreText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: commonColors.primary,
            marginTop: moderateScale(4),
            textAlign: isRTL ? 'right' : 'left',
        },
        infoRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            marginBottom: moderateScale(8),
        },
        infoLabel: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
        },
        infoValue: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
        minOrderWarning: {
            marginTop: moderateScale(16),
            padding: moderateScale(12),
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            borderRadius: moderateScale(8),
            borderWidth: 1,
            borderColor: commonColors.warning,
        },
        minOrderText: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
            color: commonColors.warning,
            textAlign: 'center',
        },
        footer: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.surface,
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(16),
            paddingBottom: moderateScale(32), // Accounts for safe area
            borderTopWidth: 1,
            borderTopColor: colors.inputBorder,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
        },
        priceContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: isRTL ? 'flex-end' : 'flex-start',
        },
        totalLabel: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
        },
        totalPrice: {
            fontSize: moderateScale(22),
            fontFamily: fontFamily.bold,
            color: colors.text,
        },
        addToCartBtn: {
            flex: 1.5,
            backgroundColor: commonColors.primary,
            borderRadius: moderateScale(24),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: isRTL ? 0 : moderateScale(16),
            marginRight: isRTL ? moderateScale(16) : 0,
            height: moderateScale(48),
        },
        addToCartBtnDisabled: {
            backgroundColor: colors.buttonDisabled,
        },
        addToCartText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
            color: commonColors.white,
        },
    }), [isRTL, theme, colors]);
};

export default useRTLStyles;
