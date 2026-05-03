import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/colors';
import { ImagePlaceholderIcon } from '@/assets/svgIcons';

interface FastImageCompProps extends Omit<FastImageProps, 'source' | 'style'> {
    source: Source;
    style?: StyleProp<any>;
    showLoader?: boolean;
}

const FastImageComp: React.FC<FastImageCompProps> = ({
    source,
    style,
    showLoader = true,
    ...rest
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { theme } = useTheme();
    const colors = Colors[theme];

    const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <View style={[styles.container, style]}>
            {!hasError ? (
                <FastImage
                    source={source}
                    style={StyleSheet.absoluteFill}
                    onLoadStart={handleLoadStart}
                    onLoadEnd={handleLoadEnd}
                    onError={handleError}
                    {...rest}
                />
            ) : (
                <View style={[StyleSheet.absoluteFill, styles.errorContainer, { backgroundColor: colors.inputBackground }]}>
                    <ImagePlaceholderIcon color={colors.iconSecondary} />
                </View>
            )}
            {isLoading && showLoader && !hasError && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="small" color={colors.text} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
});

export default FastImageComp;
