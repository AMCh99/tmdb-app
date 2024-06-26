import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#6aa6b0'
        },
        secondary: {
            main: '#272727'
        },
        error: {
            main: red.A400
        },
        mode: 'dark'
    },

    typography: {
        fontFamily: roboto.style.fontFamily
    }
});

export default theme;
