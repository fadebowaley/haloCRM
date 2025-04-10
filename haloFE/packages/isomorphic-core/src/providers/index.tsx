import NextProgress from '@core/components/next-progress';
import { ThemeProvider } from './theme-provider';
import { JotaiProvider } from './jotai-provider';
import { DrawerViews } from '@core/drawer-views';
import { ModalViews } from '@core/modal-views';

export function Providers({
  children,
  defaultTheme,
}: React.PropsWithChildren<{
  defaultTheme: string;
}>) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <NextProgress />
      <JotaiProvider>
        {children}
        <DrawerViews />
        <ModalViews />
      </JotaiProvider>
    </ThemeProvider>
  );
}
