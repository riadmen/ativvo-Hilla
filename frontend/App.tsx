import router from 'Frontend/routes.js';
import {AuthProvider} from 'Frontend/util/auth.js';
import {RouterProvider} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createContext, useEffect, useState} from "react";
import {themeCreator} from "Frontend/themes/base";
import {StylesProvider} from "@mui/styles";

export const ThemeContext = createContext((_themeName: string): void => {
});

export default function App() {

    const [themeName, _setThemeName] = useState('GreyGooseTheme');

    useEffect(() => {
        const curThemeName =
            window.localStorage.getItem('appTheme') || 'PureLightTheme';
        _setThemeName(curThemeName);
    }, []);

    const theme = themeCreator('GreyGooseTheme');
    const setThemeName = (themeName: string): void => {
        window.localStorage.setItem('appTheme', themeName);
        _setThemeName(themeName);
    };

    return (
        <AuthProvider>
            <StylesProvider injectFirst>
                <ThemeContext.Provider value={setThemeName}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <RouterProvider router={router}/>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </StylesProvider>
        </AuthProvider>
    );
}
