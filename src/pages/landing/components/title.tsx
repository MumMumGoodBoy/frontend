import ComponentWrapper from '@/components/component-link-wrapper';
import WaveReveal from '@/components/wave-reveal';

export default function Title() {
  return (
    <div className="group relative z-10 inline-block">
      <ComponentWrapper>
        <WaveReveal
          text="WongChula"
          className="select-none px-0 text-6xl transition-opacity delay-100 md:px-0"
          delay={0}
          direction="up"
          duration="300ms"
        />
      </ComponentWrapper>
    </div>
  );
}
