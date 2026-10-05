import RegistrationForm from './RegistrationForm';
import ScrollExperience from './ScrollExperience';
import HeroThreads from './HeroThreads';

const steps = [
  ['Skill discovery framework', 'Find your strengths and the directions worth exploring.'],
  ['Exploration sessions', 'Get a clear view of the major digital skill paths.'],
  ['Practical skill exposure', 'Try the work itself, beyond watching theory.'],
  ['Guided building tasks', 'Start practising the skill you choose.'],
  ['Career and income roadmap', 'See your next steps and how to put your skill to use.'],
  ['TRP community', 'Stay connected with fellow learners and program updates.'],
];

const achievements = [
  ['5.5M+', 'Views achieved'],
  ['1,000+', 'Students trained'],
  ['1,000+', 'Pieces of content published'],
  ['3', 'Batches, back to back'],
];

function RevealLine({ children, index }) {
  return <span className="reveal-line"><span className="reveal-line-inner" style={{ '--line': index }}>{children}</span></span>;
}

export default function Home() {
  return <main id="top">
    <ScrollExperience />
    <header className="site-header wrap">
      <a className="brand" href="#top" aria-label="Top Reach Pro home"><img className="header-logo" src="/media/trp-logo-crop.png" alt="" width="54" height="52" /><span>TOP REACH<br />PRO</span></a>
      <nav aria-label="Main navigation"><a href="#how-it-works">The program</a><a href="#story">A real voice</a><a className="nav-cta" href="#register">Register <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section className="hero wrap">
      <HeroThreads />
      <div className="hero-copy">
        <h1>Find your skill.<br /><em>Shape your future.</em></h1>
        <p>For Tamil Nadu students who aren’t sure which skill to learn. Discover what fits you, then build it through real work.</p>
        <div className="hero-actions"><a className="button button-dark" href="#register">Find my direction <span aria-hidden="true">↗</span></a><a className="text-link" href="#watch">Watch the introduction <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-art" aria-label="Find your direction with Top Reach Pro">
        <div className="art-top"><span>TOP REACH PRO</span><span>DISCOVER · BUILD · DO</span></div>
        <div className="art-circle"><span>YOUR<br />NEXT<br />MOVE.</span></div>
        <div className="art-bottom"><span>Get your first income<br />in 45 days.</span><span className="art-arrow" aria-hidden="true">↗</span></div>
      </div>
    </section>

    <section className="watch-section" id="watch"><div className="wrap watch-grid">
      <div className="watch-copy"><h2 data-reveal="type"><RevealLine index={0}>Watch before</RevealLine><RevealLine index={1}>you register.</RevealLine></h2><p>In one minute, see how the Find Your Skill program helps you explore, practise, and choose a direction.</p><a className="light-link" href="#register">Ready to join? Register below <span aria-hidden="true">↗</span></a></div>
      <div className="video-shell" data-reveal="visual"><div className="video-heading"><span>THE PROGRAM, EXPLAINED</span><span>01:03</span></div><video controls playsInline preload="metadata" poster="/media/program-presenter.jpg" aria-label="Top Reach Pro program introduction"><source src="/media/program-intro.mp4" type="video/mp4" />Your browser does not support video.</video><p>Press play to learn how the program works.</p></div>
    </div></section>

    <section className="promise-section wrap" id="how-it-works">
      <div className="promise-heading"><h2><RevealLine index={0}>Stop guessing.</RevealLine><RevealLine index={1}><em>Start discovering.</em></RevealLine></h2><p>The Find Your Skill Framework helps you explore your strengths, try practical digital work, and choose a direction you can build on.</p></div>
      <div className="path-list">{steps.map(([title, description], index) => <div className="path-row" data-reveal="quiet" style={{ '--reveal-delay': `${Math.min(index, 3) * 55}ms` }} key={title}><span className="path-number">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p><span className="path-arrow" aria-hidden="true">↗</span></div>)}</div>
    </section>

    <section className="income-section"><div className="wrap income-grid"><div><h2 data-reveal="type"><RevealLine index={0}>Build a skill.</RevealLine><RevealLine index={1}><em>Work towards</em></RevealLine><RevealLine index={2}>your first income.</RevealLine></h2></div><div className="income-side" data-reveal="quiet"><p>The program is designed to help you discover a practical skill, start building it, and explore ways to earn from it within 45 days.</p><p className="income-note">Your results depend on your starting point, effort, and opportunities. Income is a goal, not a guarantee.</p><a className="button button-light" href="#register">Request program access <span aria-hidden="true">↗</span></a></div></div></section>

    <section className="achievements-section" aria-labelledby="achievements-title"><div className="wrap"><div className="achievements-heading"><h2 id="achievements-title" data-reveal="quiet"><RevealLine index={0}>The work</RevealLine><RevealLine index={1}><em>speaks.</em></RevealLine></h2><p>TopReach Pro, by the numbers.</p></div><div className="achievements-grid">{achievements.map(([figure, label], index) => <div className="achievement" data-reveal="quiet" style={{ '--reveal-delay': `${index * 65}ms` }} key={label}><strong>{figure}</strong><span>{label}</span></div>)}</div></div></section>

    <section className="story-section wrap" id="story"><div className="story-copy"><h2 data-reveal="type"><RevealLine index={0}>Hear it from</RevealLine><RevealLine index={1}>someone in the</RevealLine><RevealLine index={2}><em>TRP circle.</em></RevealLine></h2><p>A short perspective from members of the Top Reach Pro community.</p></div><div className="story-video" data-reveal="visual"><video controls playsInline preload="metadata" poster="/media/student-story-poster-06.jpg" aria-label="Top Reach Pro community video"><source src="/media/student-story-framed.mp4" type="video/mp4" />Your browser does not support video.</video></div></section>

    <section className="registration-section" id="register"><div className="wrap registration-grid"><div className="registration-intro"><h2><RevealLine index={0}>Give your</RevealLine><RevealLine index={1}>future a <em>starting point.</em></RevealLine></h2><p>Share your details and the Top Reach Pro team can contact you about joining the Find Your Skill program.</p><div className="quote-block">“Don’t just learn it.<br />Live it.<br />Skills only count when you use them.”<span>— TOP REACH PRO</span></div></div><div className="form-panel" data-reveal="quiet"><div className="form-head"><span>REGISTRATION</span><span>TAKES ABOUT A MINUTE</span></div><h3>Let’s get started.</h3><RegistrationForm /></div></div></section>

    <footer className="footer"><div className="wrap"><div className="footer-top" data-reveal="quiet"><p>Find the skill that fits your future.<br />Then put it to work.</p><a href="#top">Back to top <span aria-hidden="true">↗</span></a></div><div className="footer-wordmark" data-reveal="wordmark" aria-hidden="true">{['Top', 'Reach'].map((word, wordIndex) => <span className="footer-wordmark-word" key={word}>{word.split('').map((letter, index) => <span className={`footer-wordmark-char${index === 0 ? ' footer-wordmark-char--accent' : ''}`} style={{ '--letter': wordIndex * 3 + index }} key={`${word}-${index}`}>{letter}</span>)}</span>)}</div><div className="footer-bottom"><span>TOP REACH PRO</span><span>Don’t just learn it. Live it.</span></div></div></footer>
  </main>;
}
