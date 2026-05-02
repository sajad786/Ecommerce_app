import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
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
import Svg, { Path } from 'react-native-svg';

const EmptyFavouritesIcon = ({ color }: { color: string }) => (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <EmptyFavouritesIcon color={colors.iconSecondary} />
            <TextComp isDynamic text={t('EMPTY_FAVOURITES')} style={styles.emptyText} />
        </View>
    );

    return (
        <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp showBack={false} title={t('FAVOURITES')} />

            {favouriteItems.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={favouriteItems}
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
