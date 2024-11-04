import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { Input } from './ui/input';

type InputType = string | number | readonly string[] | undefined;

interface InputDebounceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: InputType) => void;
}

const InputDebounce = ({ value, onChange, ...remain }: InputDebounceProps) => {
  const [localSearch, setLocalSearch] = useState<InputType>(value);

  const debouncedValue = useDebounce<InputType>(localSearch, 500);

  useEffect(() => {
    onChange?.(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    setLocalSearch(value);
  }, [value]);

  return <Input {...remain} value={localSearch} onChange={(ev) => setLocalSearch(ev.target.value)} />;
};

export default InputDebounce;
