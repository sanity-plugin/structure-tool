import type { UserComponent } from 'sanity/structure';

export const IframeComponent: UserComponent = ({ options }) => (
  <iframe src={options?.url as string} width="100%" height="100%" style={{ border: 'none' }} />
);
