import type { UserComponent, UserViewComponent } from 'sanity/structure';

export const IframeComponent: UserComponent = ({ options }) => (
  <iframe src={options?.url as string} width="100%" height="100%" style={{ border: 'none' }} />
);

export const IframeViewComponent: UserViewComponent = ({ options }) => (
  <iframe src={options?.url as string} width="100%" height="100%" style={{ border: 'none' }} />
);
