// Shared colours and spacing so every screen has the same look and feel.
export const colors = {
  primary: '#1B5E20',
  primaryLight: '#E8F5E9',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#222222',
  muted: '#666666',
  border: '#CCCCCC',
  error: '#C62828',
  errorLight: '#FDECEA',
  success: '#2E7D32',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.45)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  pill: 999,
} as const;
