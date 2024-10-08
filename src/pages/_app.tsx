import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const dotenv = require('dotenv');
dotenv.config();

const queryClient = new QueryClient();

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <QueryClientProvider client={queryClient}>
            <AppCacheProvider {...props}>
                <Head>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppCacheProvider>
        </QueryClientProvider>
    );
}
