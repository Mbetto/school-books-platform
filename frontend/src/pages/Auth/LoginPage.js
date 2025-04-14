import React from 'react';
import { Container, Paper, Typography, TextField, Button, Link, Grid, Box } from '@mui/material';
import { Lock as LockIcon, Email as EmailIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Login submitted:', values);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
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
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
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
                  startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          )}
        </Formik>
        
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="body1">
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to="/register">
                Register here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;