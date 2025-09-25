import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as Popover from '@radix-ui/react-tooltip';
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner"

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <div>
      <Popover.TooltipProvider>
        <Toaster richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </Popover.TooltipProvider>
    </div>
  )
}

const AppWithAuth = (props: AppProps) => (
  <SessionProvider session={props.pageProps.session}>
    <App {...props} />
  </SessionProvider>
);

export default AppWithAuth;