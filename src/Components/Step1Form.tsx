import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFormDataStep1, nextStep } from '../redux/userSlice';

interface Step1Props {
  onSubmit: SubmitHandler<any>;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters')
    .min(3, 'Name must be at least 3 characters'),
  age: yup.number().required('Age is required').positive('Age must be a positive integer'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  id_type: yup.string().required('ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
  govt_id: yup
    .string()
    .required('Govt ID is required')
    .test('id_type-validation', 'Invalid ID', function (govt_id) {
      const id_type = this.parent.id_type;
      if (id_type === 'Aadhar') {
        return /^[2-9]\d{11}$/.test(govt_id);
      } else if (id_type === 'PAN') {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(govt_id);
      }
      return true;
    }),
});

const Step1Form: React.FC<Step1Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const handleNext = async (data: any) => {
    dispatch(setFormDataStep1(data));
    dispatch(nextStep());
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <form onSubmit={handleSubmit(handleNext)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                {...register('name')}
                fullWidth
                error={Boolean(formState.errors.name)}
                helperText={formState.errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                type="number"
                {...register('age')}
                fullWidth
                error={Boolean(formState.errors.age)}
                helperText={formState.errors.age?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select label="Sex" {...register('sex')} error={Boolean(formState.errors.sex)}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile"
                {...register('mobile')}
                fullWidth
                error={Boolean(formState.errors.mobile)}
                helperText={formState.errors.mobile?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>ID Type</InputLabel>
                <Select label="ID Type" {...register('id_type')} error={Boolean(formState.errors.id_type)}>
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ID Number"
                {...register('govt_id')}
                fullWidth
                error={Boolean(formState.errors.govt_id)}
                helperText={formState.errors.govt_id?.message}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!formState.isValid}
              sx={{ backgroundColor: 'teal', color: 'white', '&:hover': { backgroundColor: 'teal' } }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Step1Form;
