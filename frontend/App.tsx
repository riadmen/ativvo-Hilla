import router from 'Frontend/routes.js';
import {AuthProvider} from 'Frontend/util/auth.js';
import {RouterProvider} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


export default function App() {
    const theme = createTheme({
        components: {
            MuiButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFormControl: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFormHelperText: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiIconButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiInputBase: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiInputLabel: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: true,
                },
            },
            MuiOutlinedInput: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFab: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTable: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTextField: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiToolbar: {
                defaultProps: {
                    variant: 'dense',
                },
            },
        },
    });

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>

                <CssBaseline/>
                <RouterProvider router={router}/>

            </ThemeProvider>
        </AuthProvider>
    );
}
