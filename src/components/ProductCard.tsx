import React, { useMemo } from 'react';
import { Pressable, View, StyleSheet, Dimensions } from 'react-native';
import FastImageComp from '@/components/FastImageComp';
import FastImage from 'react-native-fast-image';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import TextComp from './TextComp';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { Colors, ThemeType, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { Product } from '@/screens/main/Home/home.types';
import { HeartIcon, StarIcon } from '@/assets/svgIcons';

interface ProductCardProps {
    item: Product;
    index: number;
    onPress?: () => void;
    onAddToCart?: () => void;
    onIncreaseQuantity?: () => void;
    onDecreaseQuantity?: () => void;
    cartQuantity?: number;
    isOutOfStock?: boolean;
    onToggleFavourite?: () => void;
    isFavourite?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = moderateScale(8);
const CARD_WIDTH = (width - moderateScale(32) - CARD_MARGIN * 2) / 2;

const ProductCard = ({
    item,
    index,
    onPress,
    onAddToCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
    cartQuantity = 0,
    isOutOfStock = false,
    onToggleFavourite,
    isFavourite = false
}: ProductCardProps) => {
    const isRTL = useIsRTL();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const colors = Colors[theme];
    const styles = useRTLStyles(isRTL, theme);

    return (
        <Animated.View
            style={[styles.cardShadowShell, { backgroundColor: colors.surface }]}
            entering={FadeInDown.delay((index % 10) * 100).springify()}
            exiting={FadeOut}
        >
             <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <Pressable onPress={onPress} style={styles.cardPressable}>
                    <View style={styles.imageContainer}>
                        <FastImageComp
                            source={{ uri: item.thumbnail, priority: FastImage.priority.normal }}
                            style={styles.productImage}
                            resizeMode={FastImage.resizeMode.contain}
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
                            <StarIcon color="#FFD700" size={12} />
                            <TextComp isDynamic text={item.rating.toFixed(1)} style={[styles.ratingText, { color: colors.textSecondary }]} />
                        </View>

                        <View style={[styles.priceRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <TextComp isDynamic text={`$${item.price.toFixed(2)}`} style={[styles.price, { color: commonColors.primary }]} />
                        </View>

                        {onAddToCart && (
                            cartQuantity > 0 && onIncreaseQuantity && onDecreaseQuantity ? (
                                <View style={styles.quantityControlContainer}>
                                    <Pressable style={styles.quantityButton} onPress={onDecreaseQuantity}>
                                        <TextComp isDynamic text="-" style={styles.quantityButtonText} />
                                    </Pressable>
                                    <TextComp isDynamic text={cartQuantity.toString()} style={[styles.quantityText, { color: colors.text }]} />
                                    <Pressable
                                        style={[styles.quantityButton, cartQuantity >= item.stock && styles.quantityButtonDisabled]}
                                        onPress={onIncreaseQuantity}
                                        disabled={cartQuantity >= item.stock}
                                    >
                                        <TextComp isDynamic text="+" style={styles.quantityButtonText} />
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable
                                    style={[styles.addToCartButton, { backgroundColor: isOutOfStock ? colors.buttonDisabled : commonColors.primary }]}
                                    onPress={onAddToCart}
                                    disabled={isOutOfStock}
                                >
                                    <TextComp isDynamic text={isOutOfStock ? t('OUT_OF_STOCK') : t('ADD_TO_CART')} style={styles.addToCartText} />
                                </Pressable>
                            )
                        )}
                    </View>
                </Pressable>
            </View>
        </Animated.View>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        cardShadowShell: {
            width: CARD_WIDTH,
            margin: CARD_MARGIN,
            borderRadius: moderateScale(12),
            backgroundColor: colors.surface,  // ← must NOT be transparent for iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            // NO overflow: 'hidden' here
        },
        card: {
            borderRadius: moderateScale(12),
    overflow: 'hidden',   // ← clipping stays here, shadow is safe above
    flex: 1,
            // width: CARD_WIDTH,
            // backgroundColor: 'transparent',
            // borderRadius: moderateScale(12),
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 4,
            // elevation: 3,
            // margin: CARD_MARGIN,
            // overflow: 'hidden',
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
        addToCartButton: {
            marginTop: moderateScale(8),
            borderRadius: moderateScale(8),
            paddingVertical: moderateScale(8),
            alignItems: 'center',
            justifyContent: 'center',
        },
        addToCartText: {
            color: commonColors.white,
            fontSize: moderateScale(12),
            fontFamily: fontFamily.semiBold,
        },
        quantityControlContainer: {
            marginTop: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(6),
        },
        quantityButton: {
            width: moderateScale(26),
            height: moderateScale(26),
            borderRadius: moderateScale(13),
            backgroundColor: commonColors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        quantityButtonDisabled: {
            backgroundColor: colors.buttonDisabled,
        },
        quantityButtonText: {
            color: commonColors.white,
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
            lineHeight: moderateScale(18),
        },
        quantityText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.bold,
            minWidth: moderateScale(24),
            textAlign: 'center',
        },
    }), [isRTL, theme, colors]);
};

export default ProductCard;
