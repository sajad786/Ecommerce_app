import React, { useState, useRef } from 'react';
import { View, ScrollView, Pressable, Animated, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '@/components/HeaderComp';
import WrapperContainer from '@/components/WrapperContainer';
import TextComp from '@/components/TextComp';
import ImageCarousel from '@/components/ImageCarousel';
import { Product } from '@/screens/main/Home/home.types';
import { addToCart } from '@/redux/reducers/cart';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { RootState } from '@/redux/reducers';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { Colors, commonColors } from '@/styles/colors';
import { scale } from '@/styles/scaling';
import { BackIcon, HeartIcon, StarIcon } from '@/assets/svgIcons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ProductDetails = ({ route, navigation }: any) => {
    const { product } = route.params as { product: Product };
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [cartState, setCartState] = useState<'idle' | 'added'>('idle');
    const scaleValue = useRef(new Animated.Value(1)).current;
    const favScaleValue = useRef(new Animated.Value(1)).current;

    const favouriteItems = useSelector((state: RootState) => state.favourites.items);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const isFavourite = favouriteItems.some(fav => fav.id === product.id);
    const isItemInCart = cartItems.some(item => item.id === product.id);

    // Reset local state when product changes
    React.useEffect(() => {
        setCartState('idle');
        setIsDescriptionExpanded(false);
    }, [product.id]);

    const handleAddToCart = () => {
        if (isItemInCart) {
            navigation.navigate('Cart');
            return;
        }

        dispatch(addToCart(product));

        // Scale animation
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCartState('added');

        // Note: we don't need the 'visit_cart' timeout anymore, because 
        // 'isItemInCart' will instantly be true from Redux, and we will base the UI on that.
        setTimeout(() => {
            setCartState('idle'); // Just reset the animation state
        }, 1500);
    };

    const handleToggleFavourite = () => {
        dispatch(toggleFavourite(product));

        Animated.sequence([
            Animated.timing(favScaleValue, {
                toValue: 1.4,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.spring(favScaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const getButtonText = () => {
        if (product.stock === 0) return t('OUT_OF_STOCK');
        if (cartState === 'added') return t('ADDED_TO_CART', 'Added!');
        if (isItemInCart) return t('GO_TO_CART', 'Go to Cart');
        return t('ADD_TO_CART');
    };

    const getButtonColor = () => {
        if (product.stock === 0) return colors.buttonDisabled;
        if (cartState === 'added') return commonColors.success;
        if (isItemInCart) return commonColors.secondary; // Or any highlight color
        return commonColors.primary;
    };

    return (
        <WrapperContainer style={styles.container} edges={['top', 'bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    hitSlop={10}
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        top: scale(22),
                        left: scale(22),
                    }}
                >
                    <BackIcon color={colors.text} />
                </Pressable>

                <AnimatedPressable
                    onPress={handleToggleFavourite}
                    hitSlop={10}
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        top: scale(22),
                        right: scale(22),
                        transform: [{ scale: favScaleValue }]
                    }}
                >
                    <HeartIcon size={24} isFilled={isFavourite} color={isFavourite ? commonColors.primary : colors.text} />
                </AnimatedPressable>

                <ImageCarousel images={product.images} />

                <View style={styles.detailsContainer}>
                    <View style={styles.titleRow}>
                        <TextComp isDynamic text={product.title} style={styles.title} />
                    </View>

                    <View style={[styles.ratingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <StarIcon color="#FFD700" />
                        <TextComp isDynamic text={product.rating.toFixed(1)} style={styles.ratingText} />
                        <TextComp isDynamic text={`(${product.reviews?.length || 0} ${t('REVIEWS')})`} style={styles.reviewsText} />
                    </View>

                    <View style={styles.divider} />

                    <TextComp isDynamic text={t('DESCRIPTION')} style={styles.sectionTitle} />
                    <TextComp
                        isDynamic
                        text={product.description}
                        style={styles.descriptionText}
                        numberOfLines={isDescriptionExpanded ? undefined : 3}
                    />
                    <Pressable onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                        <TextComp
                            isDynamic
                            text={isDescriptionExpanded ? t('SHOW_LESS') : t('READ_MORE')}
                            style={styles.readMoreText}
                        />
                    </Pressable>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <TextComp isDynamic text={t('WARRANTY')} style={styles.infoLabel} />
                        <TextComp isDynamic text={product.warrantyInformation} style={styles.infoValue} />
                    </View>

                    <View style={styles.infoRow}>
                        <TextComp isDynamic text="Brand" style={styles.infoLabel} />
                        <TextComp isDynamic text={product.brand || 'N/A'} style={styles.infoValue} />
                    </View>

                    {product.minimumOrderQuantity > 1 && (
                        <View style={styles.minOrderWarning}>
                            <TextComp
                                isDynamic
                                text={t('MIN_ORDER_QTY').replace('{{qty}}', product.minimumOrderQuantity.toString())}
                                style={styles.minOrderText}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <TextComp isDynamic text={t('TOTAL')} style={styles.totalLabel} />
                    <TextComp isDynamic text={`$${product.price.toFixed(2)}`} style={styles.totalPrice} />
                </View>
                <AnimatedPressable
                    style={[
                        styles.addToCartBtn,
                        { backgroundColor: getButtonColor(), transform: [{ scale: scaleValue }] }
                    ]}
                    onPress={handleAddToCart}
                    disabled={product.stock === 0 || cartState === 'added'}
                >
                    <TextComp
                        isDynamic
                        text={getButtonText()}
                        style={styles.addToCartText}
                    />
                </AnimatedPressable>
            </View>
        </WrapperContainer>
    );
};

export default ProductDetails;
