import { ListItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import theme from '../../theme/theme';

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
                bgcolor: isActive ? theme.palette.primary.main : 'transparent',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    bgcolor: isActive
                        ? theme.palette.primary.main
                        : 'rgba(255, 255, 255, 0.1)'
                }
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
