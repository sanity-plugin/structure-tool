import constants from '@/constants';
import { interFont } from '@/styles/font';

import type { Metadata } from 'next';

import type { Layout } from '@/@types/next.types';

export const metadata: Metadata = {
  title: constants.APP_NAME,
  description: `${constants.APP_NAME} Description`,
};

const RootLayout: Layout = async ({ children }) => (
  <html lang="en">
    <body className={interFont.className}>{children}</body>
  </html>
);

export default RootLayout;
