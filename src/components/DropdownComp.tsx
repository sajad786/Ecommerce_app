import React, { useRef, useState, useEffect } from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import TextComp from './TextComp';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import useIsRTL from '@/hooks/useIsRTL';
import fontFamily from '@/styles/fontFamily';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownCompProps {
    data: DropdownOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    renderTrigger: (onPress: () => void) => React.ReactNode;
    dropdownWidth?: number;
    align?: 'left' | 'right';
}

const DropdownComp = ({ data, selectedValue, onSelect, renderTrigger, dropdownWidth = moderateScale(150), align }: DropdownCompProps) => {
    const { theme } = useTheme();
    const colors = Colors[theme];
    const isRTL = useIsRTL();
    const triggerRef = useRef<View>(null);
    const [visible, setVisible] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState<{ top: number; left?: number; right?: number }>({ top: 0, left: 0 });

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const toggleDropdown = () => {
        if (visible) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    const openDropdown = () => {
        triggerRef.current?.measure((fx, fy, width, height, px, py) => {
            const screenWidth = Dimensions.get('window').width;

            const layout: { top: number; left?: number; right?: number } = {
                top: py + height * 0.4,
            };

            if (align === 'right') {
                layout.right = screenWidth - (px + width);
                // Keep it on screen
                if (layout.right < 0) {
                    layout.right = 10;
                }
            } else {
                let leftPos = px;
                // Calculate left position. If it goes off-screen to the right, keep it on screen
                if (px + dropdownWidth > screenWidth) {
                    leftPos = screenWidth - dropdownWidth - 10;
                }
                layout.left = leftPos;
            }

            setDropdownLayout(layout);

            setVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    const closeDropdown = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        closeDropdown();
    };

    return (
        <>
            <View ref={triggerRef} collapsable={false}>
                {renderTrigger(toggleDropdown)}
            </View>

            <Modal visible={visible} transparent={true} animationType="none" onRequestClose={closeDropdown}>
                <TouchableWithoutFeedback onPress={closeDropdown}>
                    <View style={styles.overlay}>
                        <Animated.View
                            style={[
                                styles.dropdownContainer,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: colors.inputBorder,
                                    top: dropdownLayout.top,
                                    ...(dropdownLayout.left !== undefined ? { left: dropdownLayout.left } : {}),
                                    ...(dropdownLayout.right !== undefined ? { right: dropdownLayout.right } : {}),
                                    width: dropdownWidth,
                                    opacity: fadeAnim,
                                    transform: [
                                        {
                                            translateY: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-10, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            {(data?.length > 0) ? data?.map((item, index) => {
                                const isSelected = item?.value === selectedValue;
                                return (
                                    <Pressable
                                        key={item?.value}
                                        style={[
                                            styles.option,
                                            {
                                                borderBottomWidth: index === data.length - 1 ? 0 : 1,
                                                borderBottomColor: colors.inputBorder,
                                            },
                                        ]}
                                        onPress={() => handleSelect(item.value)}
                                    >
                                        <TextComp
                                            text={item.label}
                                            isDynamic
                                            style={[
                                                styles.optionText,
                                                {
                                                    color: isSelected ? colors.buttonPrimary : colors.text,
                                                    fontFamily: isSelected ? fontFamily.semiBold : fontFamily.regular,
                                                    textAlign: isRTL ? 'right' : 'left'
                                                },
                                            ]}
                                        />
                                    </Pressable>
                                );
                            }) : <View>
                                <TextComp text="No Data Found" isDynamic style={styles.optionText} />
                            </View>}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    dropdownContainer: {
        position: 'absolute',
        borderRadius: moderateScale(12),
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    option: {
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(16),
    },
    optionText: {
        fontSize: moderateScale(14),
    },
});

export default DropdownComp;
