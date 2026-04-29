import { MarginalMusings } from '../components/MarginalMusings';
import { PageBackground } from '../components/3d/PageBackground';
import { StarDecorations } from '../components/StarDecorations';

export function Musings() {
  return (
    <>
      <PageBackground color1="#E11D48" color2="#9F1239" color3="#000000" />
      <StarDecorations variant="musings" />
      <div className="relative z-10 pt-20">
        <MarginalMusings />
      </div>
    </>
  );
}
