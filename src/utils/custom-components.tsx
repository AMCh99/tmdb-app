import styled from "@emotion/styled";
import { CardContent, ListItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import theme from '../theme/theme';

export const ScrollableCardContent = styled(CardContent)(({ color }) => ({
    overflow: 'auto',

    '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
        marginRight: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '5px',
        marginRight: '10px'
    },
    '&::-webkit-scrollbar-track': {
        margin: '24px'
    }
}));

interface Props {
    href: string;
    title: string;
}

export const NavItem = (props: Props) => {
    const router = useRouter();
    const isActive: boolean = router.pathname == props.href;

    return (
        <ListItem
            sx={{
                bgcolor: isActive ? theme.palette.primary.main : ''
            }}
        >
            <Link
                href={props.href}
                style={{
                    textDecoration: 'none',
                    fontSize: '1.68em',
                    color: isActive
                        ? theme.palette.secondary.main
                        : theme.palette.primary.main
                }}
            >
                {props.title}
            </Link>
        </ListItem>
    );
};