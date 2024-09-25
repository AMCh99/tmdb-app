import Typography from '@mui/material/Typography';
import theme from '../theme/theme';

export function Copyright() {
    return (
        <Typography
            variant="body2"
            color={theme.palette.primary.main}
            align="center"
        >
            {'Copyright © Arkadiusz Charliński '} {new Date().getFullYear()}
        </Typography>
    );
}
