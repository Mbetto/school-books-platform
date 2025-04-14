import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, CircularProgress, Alert, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Auth.scss';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await api.post('/auth/reset-password/', { email: values.email });
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setErrors({ general: error.response?.data?.message || 'Failed to send reset link' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (success) {
    return (
      <div className="auth-container">
        <Alert severity="success" sx={{ mb: 2 }}>
          Password reset link has been sent to your email.
        </Alert>
        <Typography>Redirecting to login page...</Typography>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h1>Reset Password</h1>
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {formik.errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.errors.general}
          </Alert>
        )}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          startIcon={formik.isSubmitting && <CircularProgress size={20} />}
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;