import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

export type TInputValues = {
  [name: string]: string;
}

export type TUseForm = {
  values: TInputValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<TInputValues>>;
}

export const useForm = (inputValues: TInputValues = {}): TUseForm => {
  const [values, setValues] = useState<TInputValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
