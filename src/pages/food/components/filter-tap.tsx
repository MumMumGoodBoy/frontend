import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Typography from '@/components/ui/typography';

export default function FilterTap() {
  return (
    <RadioGroup defaultValue="option-zero" className="flex gap-5">
      <div className="flex items-center gap-1">
        <RadioGroupItem value="option-zero" id="price0" />
        <Typography>
          <label htmlFor="price0">Default</label>
        </Typography>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="option-one" id="price1" />
        <Typography>
          <label htmlFor="price1">0 - 100</label>
        </Typography>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="option-two" id="price2" />
        <Typography>
          <label htmlFor="price2">101 - 500</label>
        </Typography>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="option-three" id="price3" />
        <Typography>
          <label htmlFor="price3">501 - 2000</label>
        </Typography>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="option-four" id="price4" />
        <Typography>
          <label htmlFor="price4">2001+</label>
        </Typography>
      </div>
    </RadioGroup>
  );
}
