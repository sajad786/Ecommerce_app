import React, { useCallback, useState, useMemo } from 'react';
import { View, FlatList, TextInput, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '@/components/HeaderComp';
import WrapperContainer from '@/components/WrapperContainer';
import TextComp from '@/components/TextComp';
import ProductCard from '@/components/ProductCard';
import DropdownComp from '@/components/DropdownComp';
import { RootState } from '@/redux/reducers';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { addToCart, decreaseQuantity, increaseQuantity } from '@/redux/reducers/cart';
import { Product } from '@/screens/main/Home/home.types';
import AuthWrapperComponent from '@/components/AuthWrapperComponent';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { Colors } from '@/styles/colors';
import { debounce } from '@/utils/debounce';
import { EmptyFavouritesIcon, SortIcon } from '@/assets/svgIcons';

const Favourites = ({ navigation }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const favouriteItems = useSelector((state: RootState) => state.favourites.items);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'none' | 'price_asc' | 'price_desc' | 'rating'>('none');

    const debouncedSetQuery = useMemo(
        () => debounce((text: string) => setDebouncedQuery(text), 300),
        []
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        debouncedSetQuery(text);
    };

    const filteredAndSortedItems = useMemo(() => {
        let items = [...favouriteItems];

        // Search with debounced query
        if (debouncedQuery.trim() !== '') {
            const query = debouncedQuery.toLowerCase();
            items = items.filter(item => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
        }

        // Sort
        if (sortOrder === 'price_asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price_desc') {
            items.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'rating') {
            items.sort((a, b) => b.rating - a.rating);
        }

        return items;
    }, [favouriteItems, debouncedQuery, sortOrder]);

    const handleSortSelect = (option: string) => {
        setSortOrder(option as 'none' | 'price_asc' | 'price_desc' | 'rating');
    };

    const sortOptions = [
        { label: t('DEFAULT'), value: 'none' },
        { label: t('SORT_PRICE_LOW_HIGH'), value: 'price_asc' },
        { label: t('SORT_PRICE_HIGH_LOW'), value: 'price_desc' },
        { label: t('SORT_RATING'), value: 'rating' },
    ];

    const getSortText = () => {
        if (sortOrder === 'none') return t('DEFAULT');
        if (sortOrder === 'price_asc') return t('SORT_PRICE_LOW_HIGH');
        if (sortOrder === 'price_desc') return t('SORT_PRICE_HIGH_LOW');
        if (sortOrder === 'rating') return t('SORT_RATING');
        return t('SORT');
    };

    const onToggleFav = (item: Product) => {
        dispatch(toggleFavourite(item));
    };

    const onPressCard = (item: Product) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const onAddToCart = (item: Product) => {
        dispatch(addToCart(item));
    };

    const onIncreaseQuantity = (item: Product) => {
        dispatch(increaseQuantity(item.id));
    };

    const onDecreaseQuantity = (item: Product) => {
        dispatch(decreaseQuantity(item.id));
    };

    const renderProductCard = useCallback(({ item, index }: { item: Product; index: number }) => {
        const cartItem = cartItems.find(cartValue => cartValue.id === item.id);
        const cartQuantity = cartItem?.quantity ?? 0;
        const isOutOfStock = item.stock === 0;

        return (
            <ProductCard
                item={item}
                index={index}
                onPress={() => onPressCard(item)}
                isFavourite={true}
                onToggleFavourite={() => onToggleFav(item)}
                onAddToCart={() => onAddToCart(item)}
                onIncreaseQuantity={() => onIncreaseQuantity(item)}
                onDecreaseQuantity={() => onDecreaseQuantity(item)}
                cartQuantity={cartQuantity}
                isOutOfStock={isOutOfStock}
            />
        );
    }, [cartItems, onPressCard, onToggleFav, onAddToCart, onIncreaseQuantity, onDecreaseQuantity]);

    const renderEmptyState = () => {
        if (favouriteItems.length > 0 && filteredAndSortedItems.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <TextComp isDynamic text={t('NO_RESULTS_FOUND')} style={styles.emptyText} />
                </View>
            );
        }
        return (
            <View style={styles.emptyContainer}>
                <EmptyFavouritesIcon color={colors.iconSecondary} />
                <TextComp isDynamic text={t('EMPTY_FAVOURITES')} style={styles.emptyText} />
            </View>
        );
    };

    return (
        <AuthWrapperComponent>
            <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('FAVOURITES')} />

            {favouriteItems.length > 0 && (
                <View style={[styles.filterContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder={t('SEARCH')}
                            placeholderTextColor={colors.inputPlaceholder}
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <DropdownComp
                        data={sortOptions}
                        selectedValue={sortOrder}
                        onSelect={handleSortSelect}
                        dropdownWidth={220}
                        renderTrigger={(onPress) => (
                            <Pressable style={styles.sortButton} onPress={onPress}>
                                {sortOrder !== 'none' && (
                                    <View style={styles.dot} />
                                )}
                                <View>
                                    <SortIcon color={colors.text} />

                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            {filteredAndSortedItems.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={filteredAndSortedItems}
                    renderItem={renderProductCard}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </WrapperContainer>
        </AuthWrapperComponent>
    );
};

export default Favourites;
