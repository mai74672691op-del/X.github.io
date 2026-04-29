import { AboutMe } from '../components/AboutMe';
import { PageBackground } from '../components/3d/PageBackground';
import { StarDecorations } from '../components/StarDecorations';

export function About() {
  return (
    <>
      <PageBackground color1="#D4D4D8" color2="#B45309" color3="#000000" />
      <StarDecorations variant="about" />
      <div className="relative z-10 pt-20">
        <AboutMe />
      </div>
    </>
  );
}
