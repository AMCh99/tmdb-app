import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © Arkadiusz Charliński '} {new Date().getFullYear()}.
      </Typography>
  );
}
