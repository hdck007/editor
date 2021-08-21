import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import 'tippy.js/dist/tippy.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
export default MyApp;
