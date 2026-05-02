import { Product } from "@/screens/main/Home/home.types";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
};

export type MainStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favourites: undefined;
  Profile: undefined;
  Settings: undefined;
  ProductDetails: {
    product: Product;
  };
}; 