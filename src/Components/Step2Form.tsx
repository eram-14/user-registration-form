import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  Autocomplete,
} from '@mui/material';
import { fetchCountries } from '../api/country';
import { useDispatch } from 'react-redux';
import { setFormDataStep2, nextStep, addFormData } from '../redux/userSlice';

interface Step2Props {
  onSubmit: SubmitHandler<any>;
}

const schema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.string().matches(/^\d+$/, 'Invalid Pincode').optional(),
});

const Step2: React.FC<Step2Props> = ({ onSubmit }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState('');

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();

  const handleCountryChange = async (value: string) => {
    const countries = await fetchCountries(value);
    setCountryOptions(countries);
    setCountry(value);
  };

  const handleNext = (data: any) => {
    data = { ...data, country: country }
    dispatch(setFormDataStep2(data));
    dispatch(addFormData());
    onSubmit(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Step 2: Address Information
        </Typography>
        <form onSubmit={handleSubmit(handleNext)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Address" {...register('address')} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="State" {...register('state')} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="City" {...register('city')} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={countryOptions} // Fetch dynamically based on user input
                freeSolo
                onInputChange={(event, value) => handleCountryChange(value)}
                renderInput={(params) => <TextField {...params} label="Country" fullWidth variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Pincode" {...register('pincode')} fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={!formState.isValid}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Step2;
