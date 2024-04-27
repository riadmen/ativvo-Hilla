import router from 'Frontend/routes.js';
import { AuthProvider } from 'Frontend/util/auth.js';
import { RouterProvider } from 'react-router-dom';
import {BaseStyles, ThemeProvider} from "@primer/react";

export default function App() {
  return (
    <AuthProvider>
        <ThemeProvider>
            <BaseStyles>
                <RouterProvider router={router} />
            </BaseStyles>
        </ThemeProvider>
    </AuthProvider>
  );
}
