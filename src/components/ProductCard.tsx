import React, { useMemo } from 'react';
import { Pressable, View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import TextComp from './TextComp';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { Colors, ThemeType, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { Product } from '@/screens/main/Home/home.types';
import Svg, { Path } from 'react-native-svg';

interface ProductCardProps {
    item: Product;
    index: number;
    onPress?: () => void;
    onAddToCart?: () => void;
    onToggleFavourite?: () => void;
    isFavourite?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = moderateScale(8);
const CARD_WIDTH = (width - moderateScale(32) - CARD_MARGIN * 2) / 2;

const HeartIcon = ({ isFilled, color }: { isFilled: boolean, color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill={isFilled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

const ProductCard = ({ item, index, onPress, onAddToCart, onToggleFavourite, isFavourite = false }: ProductCardProps) => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const colors = Colors[theme];
    const styles = useRTLStyles(isRTL, theme);

    return (
        <Animated.View
            style={[styles.card, { backgroundColor: colors.surface }]}
            entering={FadeInDown.delay((index % 10) * 100).springify()}
            exiting={FadeOut}
        >
            <Pressable onPress={onPress} style={styles.cardPressable}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <Pressable style={styles.favouriteButton} onPress={onToggleFavourite} hitSlop={10}>
                        <HeartIcon isFilled={isFavourite} color={isFavourite ? commonColors.primary : colors.iconSecondary} />
                    </Pressable>
                    {item.discountPercentage > 0 && (
                        <View style={styles.discountBadge}>
                            <TextComp text={`-${Math.round(item.discountPercentage)}%`} style={styles.discountText} isDynamic={true} />
                        </View>
                    )}
                </View>
                
                <View style={styles.cardContent}>
                    <TextComp isDynamic text={item.title} style={[styles.productName, { color: colors.text, textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2} />
                    
                    <View style={[styles.ratingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </Svg>
                        <TextComp isDynamic text={item.rating.toFixed(1)} style={[styles.ratingText, { color: colors.textSecondary }]} />
                    </View>

                    <View style={[styles.priceRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <TextComp isDynamic text={`$${item.price.toFixed(2)}`} style={[styles.price, { color: commonColors.primary }]} />
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        card: {
            width: CARD_WIDTH,
            backgroundColor: 'transparent',
            borderRadius: moderateScale(12),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            margin: CARD_MARGIN,
            overflow: 'hidden',
        },
        cardPressable: {
            flex: 1,
            width: '100%',
        },
        imageContainer: {
            width: '100%',
            height: CARD_WIDTH,
            backgroundColor: colors.inputBackground,
            position: 'relative',
        },
        productImage: {
            width: '100%',
            height: '100%',
        },
        favouriteButton: {
            position: 'absolute',
            top: moderateScale(8),
            ...(isRTL ? { left: moderateScale(8) } : { right: moderateScale(8) }),
            backgroundColor: colors.surface,
            padding: moderateScale(6),
            borderRadius: moderateScale(20),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
            zIndex: 2,
        },
        discountBadge: {
            position: 'absolute',
            bottom: moderateScale(8),
            ...(isRTL ? { right: moderateScale(8) } : { left: moderateScale(8) }),
            backgroundColor: commonColors.secondary,
            paddingHorizontal: moderateScale(6),
            paddingVertical: moderateScale(2),
            borderRadius: moderateScale(4),
        },
        discountText: {
            color: commonColors.white,
            fontSize: moderateScale(10),
            fontFamily: fontFamily.bold,
        },
        cardContent: {
            padding: moderateScale(12),
            flex: 1,
            justifyContent: 'space-between',
        },
        productName: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            marginBottom: moderateScale(6),
            height: moderateScale(40), // fixed height for 2 lines
        },
        ratingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: moderateScale(6),
        },
        ratingText: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.regular,
            marginHorizontal: moderateScale(4),
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        price: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
        },
    }), [isRTL, theme, colors]);
};

export default ProductCard;
