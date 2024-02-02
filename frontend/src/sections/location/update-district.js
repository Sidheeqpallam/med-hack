import * as Yup from 'yup'
import { useFormik } from "formik";
import {
  Modal, Typography, Unstable_Grid2 as Grid, Button, FormControl, InputLabel,
  Select, MenuItem, TextField
} from "@mui/material";
import { Box } from "@mui/system";
import { getDistricts, getStates, updateDistrict, } from "@/services/locations";
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


const UpdateDistrict = (props) => {
  const { open, handleClose, setReload, data } = props
  const [states, setStates] = useState([])

  useEffect(() => {
    if (open) {
      getStates().then((states) => {
        setStates(states)
        formik.resetForm({
          values: {
            districtName: data.districtName ? data.districtName : '',
            stateId: data.stateId ? data.stateId : '',
            districtLatitude: data.districtLatitude ? data.districtLatitude : '',
            districtLongitude: data.districtLongitude ? data.districtLongitude : '',
          },
        })
      }).catch(err => console.log(err))
    }
  }, [open])

  const formik = useFormik({
    initialValues: {
      districtName: '',
      stateId: '',
      districtLatitude: '',
      districtLongitude: '',
    },
    validationSchema: Yup.object({
      districtName: Yup.string().required('District name is requried'),
      districtLatitude: Yup.number()
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90')
        .notRequired()
        .typeError('Latitude must be a number'),
      districtLongitude: Yup.number()
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
        .notRequired()
        .typeError('Longitude must be a number'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await updateDistrict(data?.districtId, values)
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
          Update District
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
                error={!!(formik.touched.districtName && formik.errors.districtName)}
                fullWidth
                helperText={formik.touched.districtName && formik.errors.districtName}
                label={'District Name'}
                name={'districtName'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.districtName}
              />
            </Grid>
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
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.districtLatitude && formik.errors.districtLatitude)}
                fullWidth
                helperText={formik.touched.districtLatitude && formik.errors.districtLatitude}
                label={'Latitude'}
                name={'districtLatitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.districtLatitude}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.districtLongitude && formik.errors.districtLongitude)}
                fullWidth
                helperText={formik.touched.districtLongitude && formik.errors.districtLongitude}
                label={'Longitude'}
                name={'districtLongitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.districtLongitude}
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

export default UpdateDistrict;
