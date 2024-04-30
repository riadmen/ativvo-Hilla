import router from 'Frontend/routes.js';
import {AuthProvider} from 'Frontend/util/auth.js';
import {RouterProvider} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


export default function App() {
    const theme = createTheme();

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </AuthProvider>
    );
}
