'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '~/sanity.config';

import type { Component } from '@/@types/next.types';

export const dynamic = 'force-static';

// export { metadata, viewport } from 'next-sanity/studio';

const StudioPage: Component = () => <NextStudio config={config} />;

export default StudioPage;
