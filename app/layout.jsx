import '@fontsource-variable/figtree';
import './globals.css';
import CustomCursor from './CustomCursor';
import MetaPixel from './MetaPixel';

const socialTitle = 'Top Reach Pro | Find the right skill for your future';
const socialDescription = 'Discover the skill that fits you. Build it through real work with Top Reach Pro.';

export const metadata = {
  metadataBase: new URL('https://topreachpto.vercel.app'),
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    url: '/',
    siteName: 'Top Reach Pro',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Top Reach Pro — Find your skill. Shape your future.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description: socialDescription,
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>
    {/* THESIS: Make skill discovery feel like a first move, not another abstract course promise.
        OWN-WORLD: Warm paper, near-black typography, a single sunset orange, bold editorial scale, and dark media frames.
        STORY: Understand the program, watch the explanation, see the path and a real voice, then register.
        FIRST VIEWPORT: A large left-aligned statement and primary action share space with an expressive orange program panel.
        FORM: An open campaign page with an inline registration form. Seed: user-pinned Claude-inspired direction.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md */}
    {children}
    <MetaPixel />
    <CustomCursor />
  </body></html>;
}
