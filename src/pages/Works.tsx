import { DigitalTraces } from '../components/DigitalTraces';
import { PageBackground } from '../components/3d/PageBackground';
import { StarDecorations } from '../components/StarDecorations';

export function Works() {
  return (
    <>
      <PageBackground color1="#10B981" color2="#0D9488" color3="#000000" />
      <StarDecorations variant="works" />
      <div className="relative z-10 pt-20">
        <DigitalTraces />
      </div>
    </>
  );
}
