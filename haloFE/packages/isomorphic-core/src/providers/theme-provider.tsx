'use client';

// import hideRechartsConsoleError from '@core/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
export { useTheme } from 'next-themes';

// hideRechartsConsoleError();

export function ThemeProvider({
  children,
  defaultTheme,
}: React.PropsWithChildren<{
  defaultTheme: string;
}>) {
  return (
    <NextThemeProvider enableSystem={false} defaultTheme={defaultTheme}>
      {children}
    </NextThemeProvider>
  );
}
