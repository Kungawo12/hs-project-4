"use client";

import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProviderWrapper({ children }) {
    const [isLightMode, setIsLightMode] = useState(true);
    console.log("ThemeProviderWrapper rendered");

    const theme = createTheme({
    palette: {
        mode: isLightMode ? 'light' : 'dark',
    },
    });

    return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        </ThemeProvider>
    </ThemeContext.Provider>
    );
}