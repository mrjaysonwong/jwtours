import { TextField } from '@mui/material';

export const CustomTextField = (props) => {
  const { field, id, label, name, value, error } = props;
  return (
    <TextField
      {...field}
      fullWidth
      id={id}
      label={label}
      name={name}
      value={value}
      error={!!error}
      autoComplete="on"
      inputProps={{ maxLength: 100 }}
    />
  );
};
