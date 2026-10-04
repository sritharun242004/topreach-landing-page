import '@fontsource-variable/figtree';
import './globals.css';
import CustomCursor from './CustomCursor';

export const metadata = {
  title: 'Top Reach Pro | Find the right skill for your future',
  description: 'A practical skill discovery program for students in Tamil Nadu. Discover what fits your strengths, explore digital skills, and take your first real steps.',
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
    <CustomCursor />
  </body></html>;
}
