import {useAuth} from 'Frontend/util/auth.js';
import {useRouteMetadata} from 'Frontend/util/routing.js';
import React, {Suspense, useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {
    Box,
    Octicon,
    Avatar,
    Header,
    SplitPageLayout,
    NavList,
} from '@primer/react'
import {
    MarkGithubIcon,
} from '@primer/octicons-react'


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

    const [activeItem, setActiveItem] = useState("/");

    const handleClick = (path: string) => {
        setActiveItem(path);
    };

    const location = useLocation();

    return (

        <Box>
            <Header>
                <Header.Item>
                    <Header.Link href="#" sx={{fontSize: 2}}>
                        <Octicon icon={MarkGithubIcon} size={32} sx={{mr: 2}}/>
                        <span>GitHub</span>
                    </Header.Link>
                </Header.Item>
                <Header.Item full>Menu</Header.Item>
                <Header.Item sx={{mr: 0}}>
                    <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat"/>
                </Header.Item>
            </Header>
            <SplitPageLayout sx={{flex: '1'}}>
                <SplitPageLayout.Pane
                    position="start"
                    sx={{
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Box label="Pane">
                        <NavList>
                            {state.user ? (
                                <NavList.Item as={NavLink} to="/"
                                              aria-current={location.pathname === "/" ? "page" : undefined}
                                              onClick={() => handleClick("/")}>
                                    Hello World
                                </NavList.Item>
                            ) : null}
                            {state.user ? (
                                <NavList.Item as={NavLink} to="/about"
                                              aria-current={location.pathname === "/about" ? "page" : undefined}
                                              onClick={() => handleClick("/about")}>
                                    About
                                </NavList.Item>
                            ) : null}
                        </NavList>
                    </Box>
                </SplitPageLayout.Pane>
                <SplitPageLayout.Content
                    width='xlarge'
                    sx={{
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                        <Outlet/>
                </SplitPageLayout.Content>
            </SplitPageLayout>
        </Box>
    );
}
