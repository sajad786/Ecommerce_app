import ProductCard from '@/components/ProductCard';
import HeaderComp from '@/components/HeaderComp';
import WrapperContainer from '@/components/WrapperContainer';
import TextComp from '@/components/TextComp';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import * as homeActions from '@/redux/actions/home';
import { commonColors, Colors } from '@/styles/colors';
import { debounce } from '@/utils/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View, TextInput, Pressable } from 'react-native';
import { Product, ProductsResponse } from './home.types';
import useRTLStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '@/redux/reducers/favourites';
import { RootState } from '@/redux/reducers';

const LIMIT = 10;

const Home = ({ navigation }: any) => {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];
    const dispatch = useDispatch();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    const favouriteItems = useSelector((state: RootState) => state.favourites.items);

    const fetchCategories = async () => {
        try {
            const response = await homeActions.getCategories() as unknown as any[];
            // DummyJSON sometimes returns array of strings or objects. Assuming objects {slug, name} or strings
            if (response && Array.isArray(response)) {
                setCategories([{ slug: 'All', name: 'All' }, ...response]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async (currentSkip = 0, isRefresh = false, category = selectedCategory, search = searchQuery) => {
        if (!isRefresh) {
            if (currentSkip === 0) setLoading(true);
            else setLoadingMore(true);
        }

        try {
            let response: any;
            const queryParam = `?limit=${LIMIT}&skip=${currentSkip}`;

            if (search.trim() !== '') {
                response = await homeActions.searchProducts(`?q=${search}&limit=${LIMIT}&skip=${currentSkip}`);
            } else if (category !== 'All') {
                // If it's a category object with slug, use slug, else use string
                const catSlug = typeof category === 'string' ? category : category.slug;
                response = await homeActions.getProductsByCategory(catSlug, queryParam);
            } else {
                response = await homeActions.getProducts(queryParam);
            }

            const data = response as ProductsResponse;

            if (data && data.products) {
                if (currentSkip === 0) {
                    setProducts(data.products);
                } else {
                    setProducts(prev => [...prev, ...data.products]);
                }
                setTotal(data.total);
                setSkip(currentSkip + LIMIT);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts(0, false, 'All', '');
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts(0, true, selectedCategory, searchQuery);
    };

    const loadMore = () => {
        if (!loadingMore && products.length < total) {
            fetchProducts(skip, false, selectedCategory, searchQuery);
        }
    };

    const debouncedFetchProducts = useCallback(
        debounce((skipVal: number, isRef: boolean, cat: string, search: string) => {
            fetchProducts(skipVal, isRef, cat, search);
        }, 500),
        []
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setSkip(0);
        debouncedFetchProducts(0, false, selectedCategory, text);
    };

    const onSubmitSearch = () => {
        setSkip(0);
        fetchProducts(0, false, selectedCategory, searchQuery);
    };

    const selectCategory = (category: any) => {
        const catSlug = typeof category === 'string' ? category : category.slug;
        setSelectedCategory(catSlug);
        setSearchQuery('');
        setSkip(0);
        fetchProducts(0, false, catSlug, '');
    };

    const onPressCard = (item: Product) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const onToggleFav = (item: Product) => {
        dispatch(toggleFavourite(item));
    };

    const renderProductCard = useCallback(({ item, index }: { item: Product; index: number }) => {
        const isFav = favouriteItems.some(fav => fav.id === item.id);
        return (
            <ProductCard
                item={item}
                index={index}
                onPress={() => onPressCard(item)}
                isFavourite={isFav}
                onToggleFavourite={() => onToggleFav(item)}
            />
        );
    }, [favouriteItems, onPressCard]);

    const renderCategory = ({ item }: { item: any }) => {
        const isSelected = selectedCategory === (typeof item === 'string' ? item : item.slug);
        const displayName = typeof item === 'string' ? item : item.name;

        return (
            <Pressable
                style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
                onPress={() => selectCategory(item)}
            >
                <TextComp
                    text={displayName}
                    isDynamic
                    style={[styles.categoryText, isSelected && styles.categoryTextSelected]}
                />
            </Pressable>
        );
    };

    return (
        <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('PRODUCTS')} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder={t('SEARCH')}
                    placeholderTextColor={colors.inputPlaceholder}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onSubmitEditing={onSubmitSearch}
                    returnKeyType="search"
                />
            </View>

            <View>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item, index) => typeof item === 'string' ? item : (item.slug || index.toString())}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                    inverted={isRTL}
                />
            </View>

            {loading && products.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={commonColors.primary} />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductCard}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[commonColors.primary]}
                            tintColor={commonColors.primary}
                        />
                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingMore ? (
                            <View style={styles.footerLoader}>
                                <ActivityIndicator size="small" color={commonColors.primary} />
                            </View>
                        ) : null
                    }
                />
            )}
        </WrapperContainer>
    );
};

export default Home;
