import React, { useCallback, useState, useMemo } from 'react';
import { View, FlatList, TextInput, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '@/components/HeaderComp';
import WrapperContainer from '@/components/WrapperContainer';
import TextComp from '@/components/TextComp';
import ProductCard from '@/components/ProductCard';
import { RootState } from '@/redux/reducers';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { Product } from '@/screens/main/Home/home.types';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { Colors } from '@/styles/colors';
import { debounce } from '@/utils/debounce';
import Svg, { Path } from 'react-native-svg';

const EmptyFavouritesIcon = ({ color }: { color: string }) => (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

const SortIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 6h18" />
        <Path d="M7 12h10" />
        <Path d="M10 18h4" />
    </Svg>
);

const Favourites = ({ navigation }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const favouriteItems = useSelector((state: RootState) => state.favourites.items);

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

    const handleSortToggle = () => {
        if (sortOrder === 'none') setSortOrder('price_asc');
        else if (sortOrder === 'price_asc') setSortOrder('price_desc');
        else if (sortOrder === 'price_desc') setSortOrder('rating');
        else setSortOrder('none');
    };

    const getSortText = () => {
        if (sortOrder === 'none') return t('SORT');
        if (sortOrder === 'price_asc') return t('SORT') + ' (Price: Low-High)';
        if (sortOrder === 'price_desc') return t('SORT') + ' (Price: High-Low)';
        if (sortOrder === 'rating') return t('SORT') + ' (Rating)';
        return t('SORT');
    };

    const onToggleFav = (item: Product) => {
        dispatch(toggleFavourite(item));
    };

    const onPressCard = (item: Product) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const renderProductCard = useCallback(({ item, index }: { item: Product; index: number }) => {
        return (
            <ProductCard 
                item={item} 
                index={index} 
                onPress={() => onPressCard(item)} 
                isFavourite={true}
                onToggleFavourite={() => onToggleFav(item)}
            />
        );
    }, [onPressCard, onToggleFav]);

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
        <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('FAVOURITES')} />

            {favouriteItems.length > 0 && (
                <View style={styles.filterContainer}>
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder={t('SEARCH')}
                        placeholderTextColor={colors.inputPlaceholder}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <Pressable style={styles.sortButton} onPress={handleSortToggle}>
                        <SortIcon color={colors.text} />
                        <TextComp text={getSortText()} style={styles.sortText} isDynamic={true} />
                    </Pressable>
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
    );
};

export default Favourites;
