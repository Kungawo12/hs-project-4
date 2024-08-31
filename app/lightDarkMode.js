"use client";

import React from 'react';
import { IconButton } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useTheme } from '../app/themeContext'; // Adjust path if needed

const LightDark = () => {
    const { isLightMode, setIsLightMode } = useTheme();

    return (
    <IconButton color="inherit" onClick={() => setIsLightMode(!isLightMode)}>
        {isLightMode ? <NightsStayIcon /> : <WbSunnyIcon />}
    </IconButton>
);
};

export default LightDark;
