import { EyeIcon } from '@/assets/icons';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { addRegisteredUser } from '@/redux/reducers/auth';
import { secureStorage } from '@/utils/secureStorage';
import { AuthStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import { useTheme } from '@/context/ThemeContext';
import HeaderComp from '@/components/HeaderComp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { scale } from '@/styles/scaling';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// create a component
const Signup = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<SignupScreenNavigationProp>();
    const { registeredUsers } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const { fullName, email, phone, password, confirmPassword } = formData;
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPhone = phone.trim();

        if (!fullName.trim() || !sanitizedEmail || !sanitizedPhone || !password || !confirmPassword) {
            Alert.alert('Missing details', 'Please fill all fields to continue.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password mismatch', 'Password and confirm password must be same.');
            return;
        }

        const alreadyRegistered = registeredUsers.some(
            user => user.email.toLowerCase() === sanitizedEmail || user.phone === sanitizedPhone
        );

        if (alreadyRegistered) {
            Alert.alert('Account exists', 'This email or phone is already registered. Please login.');
            navigation.navigate('Login');
            return;
        }

        const newUser = {
            fullName: fullName.trim(),
            email: sanitizedEmail,
            phone: sanitizedPhone,
            password,
        };

        const updatedUsers = [...registeredUsers, newUser];
        await secureStorage.setObject('REGISTERED_USERS', updatedUsers);
        dispatch(addRegisteredUser(newUser));

        Alert.alert('Registered', 'Account created successfully. Verify OTP to continue.', [
            { text: 'OK', onPress: () => navigation.navigate('OTPVerification', { phoneNumber: sanitizedPhone }) }
        ]);
    };



    return (
        <WrapperContainer>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? scale(16) : 20}
            >
                <HeaderComp customStyle={styles.header} />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >

                    <View style={styles.headerContainer}>
                        <TextComp text="REGISTER" style={styles.headerTitle} />
                        <View style={styles.loginContainer}>
                            <TextComp text="ALREADY_HAVE_ACCOUNT" style={styles.loginText} />
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <TextComp text="LOG_IN" style={styles.loginLink} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <TextComp text="FULL_NAME" style={styles.label} />
                            <TextInputComp
                                placeholder="YOUR_NAME"
                                value={formData.fullName}
                                onChangeText={(text) => handleChange('fullName', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComp text="EMAIL_ADDRESS" style={styles.label} />
                            <TextInputComp
                                placeholder="YOUR_EMAIL"
                                value={formData.email}
                                onChangeText={(text) => handleChange('email', text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComp text="PHONE_NUMBER" style={styles.label} />
                            <TextInputComp
                                placeholder="YOUR_PHONE"
                                value={formData.phone}
                                onChangeText={(text) => handleChange('phone', text)}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComp text="PASSWORD" style={styles.label} />
                            <TextInputComp
                                placeholder="WRITE_HERE"
                                value={formData.password}
                                onChangeText={(text) => handleChange('password', text)}
                                secureTextEntry={!showPassword}
                                rightIcon={<EyeIcon />}
                                onRightIconPress={() => setShowPassword(!showPassword)}

                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComp text="CONFIRM_PASSWORD" style={styles.label} />
                            <TextInputComp
                                placeholder="WRITE_HERE"
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleChange('confirmPassword', text)}
                                secureTextEntry={!showConfirmPassword}
                                rightIcon={<EyeIcon />}
                                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </View>

                        <ButtonComp
                            title="NEXT"
                            onPress={handleSubmit}
                            style={styles.submitButton}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default Signup;
