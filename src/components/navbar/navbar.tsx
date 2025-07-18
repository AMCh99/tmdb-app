import {
    AppBar,
    ButtonGroup,
    IconButton,
    List,
    Toolbar,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { NavItem } from './navItem';
import theme from '../../theme/theme';
import { SearchBar } from './searchBar';

export function NavBar() {
    return (
        <AppBar position='sticky' sx={{ m: 0, padding: 0 }}>
            <Toolbar
                disableGutters
                variant='dense'
                sx={{ justifyContent: 'space-between' }}
            >
                <Typography
                    variant='h6'
                    fontSize={35}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        pl: 1,
                        pr: 1,
                        textShadow: `${theme.palette.secondary.main} 1px 1px 1px`,
                        userSelect: 'none',
                    }}
                >
                    TMDB
                </Typography>
                <List
                    sx={{
                        display: 'flex',
                        p: 0
                    }}
                >
                    <NavItem href='/' title='Home' />
                    <NavItem href='/movies' title='Movies' />
                    <NavItem href='/shows' title='Shows' />
                    <SearchBar />
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