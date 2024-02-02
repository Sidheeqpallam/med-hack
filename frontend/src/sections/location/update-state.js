import * as Yup from 'yup'
import { useFormik } from "formik";
import { Modal, Typography, Unstable_Grid2 as Grid, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateState, } from "@/services/locations";
import { useEffect, } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateState = (props) => {
  const { open, handleClose, setReload, data } = props

  const formik = useFormik({
    initialValues: {
      stateName: '',
      countryId: 1,
      stateLatitude: '',
      stateLongitude: '',
    },
    validationSchema: Yup.object({
      stateName: Yup.string().required('State name is requried'),
      stateLatitude: Yup.number()
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90')
        .notRequired()
        .typeError('Latitude must be a number'),
      stateLongitude: Yup.number()
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
        .notRequired()
        .typeError('Longitude must be a number'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await updateState(data?.stateId, values)
        handleClose()
        setReload(Math.random())
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm({
        values: {
          countryId: 1,
          stateName: data.stateName ? data.stateName : '',
          stateLatitude: data.stateLatitude ? data.stateLatitude : '',
          stateLongitude: data.stateLongitude ? data.stateLongitude : '',
        }
      })
    }
  }, [open])

  return <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Update State
        </Typography>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            spacing={2}
            sx={{ my: 2 }}>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.stateName && formik.errors.stateName)}
                fullWidth
                helperText={formik.touched.stateName && formik.errors.stateName}
                label={'State Name'}
                name={'stateName'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.stateName}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.stateLatitude && formik.errors.stateLatitude)}
                fullWidth
                helperText={formik.touched.stateLatitude && formik.errors.stateLatitude}
                label={'Latitude'}
                name={'stateLatitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.stateLatitude}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.stateLongitude && formik.errors.stateLongitude)}
                fullWidth
                helperText={formik.touched.stateLongitude && formik.errors.stateLongitude}
                label={'Longitude'}
                name={'stateLongitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.stateLongitude}
              />
            </Grid>
          </Grid>
          {formik.errors.submit && (
            <Typography
              color="error"
              sx={{ mt: 3, }}
              variant="body2"
            >
              {formik.errors.submit}
            </Typography>
          )}
          <Box display="flex" justifyContent="flex-end">
            <Button
              size="large"
              sx={{ mt: 3, mx: 5, }}
              type="submit"
              variant="contained"
            >
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  </>
}

export default UpdateState;
