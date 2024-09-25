import * as React from 'react';
import { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import theme, { roboto } from '../theme/theme';
import { Copyright } from '../components/Copyright';

const dotenv = require('dotenv');
dotenv.config();

export default function MyDocument(
    props: DocumentProps & DocumentHeadTagsProps
) {
    return (
        <Html lang='en' className={roboto.className}>
            <Head>
                <meta name='theme-color' content={theme.palette.primary.main} />
                <link rel='shortcut icon' href='/favicon.ico' />
                <meta name='emotion-insertion-point' content='' />
                <DocumentHeadTags {...props} />
            </Head>
            <body>
                <Main />
                <NextScript />
                <Copyright />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
