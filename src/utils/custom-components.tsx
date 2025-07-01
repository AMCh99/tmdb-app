import styled from '@emotion/styled';
import { CardContent } from '@mui/material';

export const ScrollableCardContent = styled(CardContent)(({ color }) => ({
    overflow: 'auto',
}));