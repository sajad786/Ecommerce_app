import React, { useState, useRef, useMemo } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors, commonColors, ThemeType } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import useIsRTL from '@/hooks/useIsRTL';

interface ImageCarouselProps {
    images: string[];
}

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { theme } = useTheme();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        
        if (roundIndex !== activeIndex) {
            setActiveIndex(roundIndex);
        }
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                inverted={isRTL}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                    </View>
                )}
            />
            {images.length > 1 && (
                <View style={styles.paginationContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index.toString()}
                            style={[
                                styles.dot,
                                { backgroundColor: index === activeIndex ? commonColors.primary : colors.iconSecondary },
                                index === activeIndex && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        container: {
            width: width,
            height: width, // Square aspect ratio for product images
            backgroundColor: colors.inputBackground,
        },
        imageContainer: {
            width: width,
            height: width,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        paginationContainer: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            position: 'absolute',
            bottom: moderateScale(16),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dot: {
            width: moderateScale(8),
            height: moderateScale(8),
            borderRadius: moderateScale(4),
            marginHorizontal: moderateScale(4),
        },
        activeDot: {
            width: moderateScale(24),
        },
    }), [isRTL, theme, colors]);
};

export default ImageCarousel;
