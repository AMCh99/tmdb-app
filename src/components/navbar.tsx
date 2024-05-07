import {
    AppBar,
    Box,
    ButtonGroup,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { NavItem } from '../utils/theme/custom-components';
import theme from '../utils/theme/theme';

export function NavBar() {
    return (
        <AppBar position="sticky" sx={{ m: 0, padding: 0 }}>
            <Toolbar
                disableGutters
                variant="dense"
                sx={{ justifyContent: 'space-between' }}
            >
                <Typography
                    variant="h6"
                    fontSize={35}
                    sx={{ bgcolor: theme.palette.primary.main, pl: 1, pr: 1 }}
                >
                    TMDB
                </Typography>
                <List
                    sx={{
                        display: 'flex',
                        p: 0
                    }}
                >
                    <NavItem href="/" title="Home" />
                    <NavItem href="/movies" title="Movies" />
                    <NavItem href="/shows" title="Shows" />
                    <NavItem href="/people" title="People" />
                    <NavItem href="/about" title="About" />
                </List>
                <ButtonGroup sx={{ mr: 2 }}>
                    <IconButton>
                        <WatchLaterIcon />
                    </IconButton>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
}
