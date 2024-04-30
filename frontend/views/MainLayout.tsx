import {Link, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography} from '@mui/material';
import {useAuth} from 'Frontend/util/auth.js';
import {useRouteMetadata} from 'Frontend/util/routing.js';
import React, {Suspense, useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import Header from "Frontend/views/Header";
import Sidebar from "Frontend/views/Sidebar";
import {useTheme} from "@mui/material/styles";

function PeopleIcon() {
    return null;
}

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    useEffect(() => {
        document.title = currentTitle;
    }, [currentTitle]);

    const {state, logout} = useAuth();
    const profilePictureUrl =
        state.user &&
        `data:image;base64,${btoa(
            state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), ''),
        )}`;

    const drawerWidth: number = 240;

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
        ({theme, open}) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
        function Link(itemProps, ref) {
            return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
        },
    );

    const theme = useTheme();

    return (
        <>
            <Header/>
            <Sidebar/>

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 5,
                    flex: 1,
                    display: 'flex',
                    pt: `${theme.header.height}`,
                    [theme.breakpoints.up('lg')]: {
                        pl: `${theme.sidebar.width}`
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <Box flexGrow={1}>
                        <Suspense>
                            <Outlet/>
                        </Suspense>
                    </Box>
                </Box>
            </Box>

        </>
    );
}
