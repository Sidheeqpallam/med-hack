import FormInput from "@/components/FormInput";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { Modal, Typography, Unstable_Grid2 as Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { postState } from "@/services/locations";


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


const AddState = (props) => {
  const { open, handleClose, setReload } = props
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
        await postState(values)
        handleClose()
        setReload(Math.random())
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    }
  })
  return <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add State
        </Typography>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            spacing={2}
            sx={{ my: 2 }}>
            <FormInput name={'stateName'} label={'State Name'} type={'text'} formik={formik} />
            <FormInput name={'stateLatitude'} label={'Latitude'} type={'text'} formik={formik} />
            <FormInput name={'stateLongitude'} label={'Longitude'} type={'text'} formik={formik} />
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
          </Grid>
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

export default AddState
