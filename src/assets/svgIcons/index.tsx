import React from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

export const TrashIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 6h18" />
        <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <Line x1="10" y1="11" x2="10" y2="17" />
        <Line x1="14" y1="11" x2="14" y2="17" />
    </Svg>
);

export const HeartIcon = ({ color, isFilled, size = 20 }: { color: string; isFilled?: boolean; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={isFilled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

export const PlusIcon = ({ color }: { color: string }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Line x1="12" y1="5" x2="12" y2="19" />
        <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
);

export const MinusIcon = ({ color }: { color: string }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
);

export const SortIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 6h18" />
        <Path d="M7 12h10" />
        <Path d="M10 18h4" />
    </Svg>
);

export const EmptyFavouritesIcon = ({ color }: { color: string }) => (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

export const EmptyCartIcon = ({ color }: { color: string }) => (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="9" cy="21" r="1" />
        <Circle cx="20" cy="21" r="1" />
        <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Svg>
);

export const CartIcon = ({ color, isFilled, size = 24 }: { color: string; isFilled?: boolean; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={isFilled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="9" cy="21" r="1" />
        <Circle cx="20" cy="21" r="1" />
        <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Svg>
);

export const BackIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 18l-6-6 6-6" />
    </Svg>
);

export const StarIcon = ({ color, size = 16 }: { color: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
);

export const MoonIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Svg>
);

export const GlobeIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
);

export const LogoutIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Svg>
);

export const ChevronDownIcon = ({ color }: { color: string }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M6 9l6 6 6-6" />
    </Svg>
);

export const ImagePlaceholderIcon = ({ color }: { color: string }) => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <Circle cx="8.5" cy="8.5" r="1.5" />
        <Polyline points="21 15 16 10 5 21" />
    </Svg>
);

export const AuthIllustration = ({ primaryColor, textColor }: { primaryColor: string; textColor: string }) => (
    <Svg width="140" height="140" viewBox="0 0 120 120" fill="none">
        <Circle cx="60" cy="60" r="50" fill={primaryColor} fillOpacity="0.08" />
        <Circle cx="60" cy="60" r="35" fill={primaryColor} fillOpacity="0.15" />
        <Rect x="42" y="55" width="36" height="26" rx="4" fill={primaryColor} />
        <Path d="M48 55V46a12 12 0 0 1 24 0v9" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <Circle cx="60" cy="68" r="3" fill="#ffffff" />
        <Path d="M60 71v5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <Path d="M25 35l3 3m0-3l-3 3" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
        <Path d="M95 40l2 2m0-2l-2 2" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
        <Path d="M85 90l3 3m0-3l-3 3" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
    </Svg>
);
