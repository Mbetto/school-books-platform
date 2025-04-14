import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Box, Link } from '@mui/material';
import { Person, Email, Lock, School } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    userType: Yup.string().required('Please select user type'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Registration submitted:', values);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                margin="normal"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                margin="normal"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  I am a:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant={values.userType === 'student' ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => handleChange({ target: { name: 'userType', value: 'student' } })}
                      startIcon={<School />}
                    >
                      Student
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant={values.userType === 'tutor' ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => handleChange({ target: { name: 'userType', value: 'tutor' } })}
                      startIcon={<Person />}
                    >
                      Tutor
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </form>
          )}
        </Formik>
        
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="body1">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Login here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;