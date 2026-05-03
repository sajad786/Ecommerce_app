import React, { useMemo } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '@/components/HeaderComp';
import WrapperContainer from '@/components/WrapperContainer';
import TextComp from '@/components/TextComp';
import CartItemCard from '@/components/CartItemCard';
import AuthWrapperComponent from '@/components/AuthWrapperComponent';
import { RootState } from '@/redux/reducers';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/redux/reducers/cart';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { Colors, commonColors } from '@/styles/colors';
import { EmptyCartIcon } from '@/assets/svgIcons';

const Cart = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const cartItems = useSelector((state: RootState) => state.cart.items);

    const favouriteItems = useSelector((state: RootState) => state.favourites.items);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    // DummyJSON discount is percentage off the original price, but the price given is usually after discount or before.
    // For this example, let's assume `price` is the final price, and we just show an arbitrary "saved" amount 
    // or calculate original price = price / (1 - discountPercentage/100).
    const discountAmount = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const originalPrice = item.price / (1 - item.discountPercentage / 100);
            return sum + ((originalPrice - item.price) * item.quantity);
        }, 0);
    }, [cartItems]);

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleMoveToFavourites = (item: any) => {
        dispatch(toggleFavourite(item));
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <EmptyCartIcon color={colors.iconSecondary} />
            <TextComp isDynamic text={t('EMPTY_CART')} style={styles.emptyText} />
        </View>
    );

    return (
        <AuthWrapperComponent>
            <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('CART')} />

            <View style={styles.countsContainer}>
                <TextComp
                    isDynamic
                    text={`${t('CART_ITEMS_COUNT', { count: cartItems.length })} | ${t('FAVOURITES_ITEMS_COUNT', { count: favouriteItems.length })}`}
                    style={styles.countsText}
                />
            </View>

            {cartItems.length === 0 ? (
                renderEmptyState()
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CartItemCard
                                item={item}
                                isFavourite={favouriteItems.some(fav => fav.id === item.id)}
                                onIncrease={() => handleIncrease(item.id)}
                                onDecrease={() => handleDecrease(item.id)}
                                onRemove={() => handleRemove(item.id)}
                                onMoveToFavourites={() => handleMoveToFavourites(item)}
                            />
                        )}
                    />

                    <View style={styles.checkoutContainer}>
                        <TextComp isDynamic text={t('PRICE_BREAKDOWN')} style={styles.breakdownTitle} />

                        <View style={styles.priceRow}>
                            <TextComp isDynamic text={t('SUBTOTAL')} style={styles.priceLabel} />
                            <TextComp isDynamic text={`$${(subtotal + discountAmount).toFixed(2)}`} style={styles.priceValue} />
                        </View>

                        <View style={styles.priceRow}>
                            <TextComp isDynamic text={t('DISCOUNT')} style={styles.priceLabel} />
                            <TextComp isDynamic text={`-$${discountAmount.toFixed(2)}`} style={[styles.priceValue, { color: commonColors.success }]} />
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.priceRow}>
                            <TextComp isDynamic text={t('TOTAL')} style={styles.totalLabel} />
                            <TextComp isDynamic text={`$${subtotal.toFixed(2)}`} style={styles.totalValue} />
                        </View>

                        <Pressable style={styles.checkoutBtn}>
                            <TextComp isDynamic text={t('CHECKOUT')} style={styles.checkoutText} />
                        </Pressable>
                    </View>
                </>
            )}
        </WrapperContainer>
        </AuthWrapperComponent>
    );
};

export default Cart;
