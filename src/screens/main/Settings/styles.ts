import { StyleSheet } from 'react-native';
import { Colors, ThemeType } from '@/styles/colors';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        content: {
            paddingTop: moderateScale(20),
            paddingBottom: moderateScale(40),
            paddingHorizontal: moderateScale(20),
        },
        headerText: {
            fontSize: moderateScale(22),
            fontFamily: fontFamily.semiBold,
            color: colors.text,
            marginBottom: verticalScale(20),
            textAlign: isRTL ? 'right' : 'left',
        },
        section: {
            marginVertical: verticalScale(10),
        },
        sectionTitle: {
            fontSize: moderateScale(13),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
            marginBottom: verticalScale(10),
            textAlign: isRTL ? 'right' : 'left',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        settingItem: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: verticalScale(12),
        },
        itemPressed: {
            opacity: 0.6,
        },
        itemLeft: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
        },
        iconContainer: {
            width: scale(36),
            height: scale(36),
            borderRadius: scale(18),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: isRTL ? 0 : scale(12),
            marginLeft: isRTL ? scale(12) : 0,
        },
        itemText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
        divider: {
            height: 1,
            backgroundColor: colors.inputBorder,
            marginVertical: verticalScale(10),
        },
        languagePill: {
            paddingHorizontal: scale(12),
            paddingVertical: verticalScale(6),
            backgroundColor: colors.inputBorder,
            borderRadius: moderateScale(16),
        },
        languageText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
    });
};

export default useRTLStyles;