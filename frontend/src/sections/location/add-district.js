import FormInput from "@/components/FormInput";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { Modal, Typography, Unstable_Grid2 as Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { getStates, postDistrict } from "@/services/locations";
import { useEffect, useState } from "react";


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


const AddDistrict = (props) => {
  const { open, handleClose, setReload } = props
  const [states, setStates] = useState([])
  useEffect(() => {
    getStates().then((data) => setStates(data)).catch(err => console.log(err))
  }, [])
  const formik = useFormik({
    initialValues: {
      districtName: '',
      stateId: '',
      districtsLatitude: '',
      districtsLongitude: '',
    },
    validationSchema: Yup.object({
      districtName: Yup.string().required('District name is requried'),
      districtsLatitude: Yup.number()
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90')
        .notRequired()
        .typeError('Latitude must be a number'),
      districtsLongitude: Yup.number()
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
        .notRequired()
        .typeError('Longitude must be a number'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await postDistrict(values)
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
          Add District
        </Typography>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            spacing={2}
            sx={{ my: 2 }}>
            <FormInput name={'districtName'} label={'District Name'} type={'text'} formik={formik} />
            <Grid item spacing={3} md={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select"
                  value={formik.values.stateId}
                  label={"State"}
                  name={'stateId'}
                  onChange={formik.handleChange}
                >
                  {states.map((item) => (
                    <MenuItem key={item.stateId} value={item.stateId}>{item.stateName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <FormInput name={'districtsLatitude'} label={'Latitude'} type={'text'} formik={formik} />
            <FormInput name={'districtsLongitude'} label={'Longitude'} type={'text'} formik={formik} />
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

export default AddDistrict
