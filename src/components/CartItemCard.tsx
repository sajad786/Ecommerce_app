import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import TextComp from './TextComp';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { Colors, ThemeType, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { CartItem } from '@/redux/reducers/cart';
import FastImageComp from './FastImageComp';
import FastImage from 'react-native-fast-image';
import { HeartIcon, MinusIcon, PlusIcon, TrashIcon } from '@/assets/svgIcons';

interface CartItemCardProps {
    item: CartItem;
    isFavourite?: boolean;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
    onMoveToFavourites: () => void;
}

const CartItemCard = ({ item, isFavourite, onIncrease, onDecrease, onRemove, onMoveToFavourites }: CartItemCardProps) => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const colors = Colors[theme];
    const styles = useRTLStyles(isRTL, theme);

    const isMinQuantity = item.quantity <= Math.max(1, item.minimumOrderQuantity);
    const isMaxQuantity = item.quantity >= item.stock;

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <FastImageComp source={{ uri: item.thumbnail, priority: FastImage.priority.high }} style={styles.image} resizeMode="contain" />

            <View style={styles.detailsContainer}>
                <View style={[styles.headerRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <TextComp text={item.title} isDynamic style={[styles.title, { color: colors.text, textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2} />
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <Pressable onPress={onMoveToFavourites} hitSlop={10} style={[styles.removeBtn, { marginRight: 8 }]}>
                            <HeartIcon color={commonColors.primary} isFilled={isFavourite} />
                        </Pressable>
                        <Pressable onPress={onRemove} hitSlop={10} style={styles.removeBtn}>
                            <TrashIcon color={commonColors.error} />
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.priceRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <TextComp text={`$${item.price.toFixed(2)}`} isDynamic style={[styles.price, { color: commonColors.primary }]} />
                </View>

                <View style={[styles.controlsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <View style={[styles.quantityContainer, { flexDirection: isRTL ? 'row-reverse' : 'row', borderColor: colors.inputBorder }]}>
                        <Pressable
                            style={[styles.qtyBtn, isMinQuantity && styles.qtyBtnDisabled]}
                            onPress={onDecrease}
                            disabled={isMinQuantity}
                        >
                            <MinusIcon color={isMinQuantity ? colors.iconSecondary : colors.text} />
                        </Pressable>

                        <TextComp text={item.quantity.toString()} isDynamic style={[styles.qtyText, { color: colors.text }]} />

                        <Pressable
                            style={[styles.qtyBtn, isMaxQuantity && styles.qtyBtnDisabled]}
                            onPress={onIncrease}
                            disabled={isMaxQuantity}
                        >
                            <PlusIcon color={isMaxQuantity ? colors.iconSecondary : colors.text} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        container: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            padding: moderateScale(12),
            borderRadius: moderateScale(12),
            marginBottom: moderateScale(12),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            marginHorizontal: moderateScale(16),
        },
        image: {
            width: moderateScale(80),
            height: moderateScale(80),
            borderRadius: moderateScale(8),
            backgroundColor: colors.inputBackground,
        },
        detailsContainer: {
            flex: 1,
            paddingHorizontal: moderateScale(12),
            justifyContent: 'space-between',
        },
        headerRow: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        title: {
            flex: 1,
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            marginHorizontal: isRTL ? 0 : moderateScale(4),
        },
        removeBtn: {
            padding: moderateScale(4),
        },
        priceRow: {
            marginTop: moderateScale(4),
            marginBottom: moderateScale(8),
        },
        price: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.bold,
        },
        controlsRow: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        quantityContainer: {
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(4),
            paddingVertical: moderateScale(2),
        },
        qtyBtn: {
            padding: moderateScale(6),
        },
        qtyBtnDisabled: {
            opacity: 0.5,
        },
        qtyText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            minWidth: moderateScale(24),
            textAlign: 'center',
        },
    }), [isRTL, theme, colors]);
};

export default CartItemCard;
