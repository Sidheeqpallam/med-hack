import * as Yup from 'yup'
import { useFormik } from "formik";
import {
  Modal, Typography, Unstable_Grid2 as Grid, Button, FormControl, InputLabel,
  Select, MenuItem, TextField
} from "@mui/material";
import { Box } from "@mui/system";
import { getDistricts, getStates, updateArea, } from "@/services/locations";
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


const UpdateArea = (props) => {
  const { open, handleClose, setReload, data } = props
  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedState, setSelectedState] = useState(null)

  useEffect(() => {
    if (open) {
      getStates().then((states) => {
        setStates(states)
        setSelectedState(data?.District?.State?.stateId)
        formik.resetForm({
          values: {
            areaName: data.areaName ? data.areaName : '',
            areaLatitude: data.areaLatitude ? data.areaLatitude : '',
            areaLongitude: data.areaLongitude ? data.areaLongitude : '',
            areaPinCode: data.areaPinCode ? data.areaPinCode : '',
            districtId: data.districtId
          },
        })
      }).catch(err => console.log(err))
    }
  }, [open])

  useEffect(() => {
    formik.values.districtId = null
    setDistricts([])
    if (selectedState) {
      getDistricts(selectedState)
        .then((districts) => setDistricts(districts))
        .catch((err) => console.log(err))
    }
  }, [selectedState]);

  const formik = useFormik({
    initialValues: {
      areaName: '',
      districtId: '',
      areaLatitude: '',
      areaLongitude: '',
      areaPinCode: '',
    },
    validationSchema: Yup.object({
      areaName: Yup.string().required('District name is requried'),
      districtId: Yup.number().required('District is required'),
      areaPinCode: Yup.number(),
      areaLatitude: Yup.number()
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90')
        .notRequired()
        .typeError('Latitude must be a number'),
      areaLongitude: Yup.number()
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
        .notRequired()
        .typeError('Longitude must be a number'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await updateArea(data?.areaId, values)
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
          Update Area
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
                error={!!(formik.touched.areaName && formik.errors.areaName)}
                fullWidth
                helperText={formik.touched.areaName && formik.errors.areaName}
                label={'Area Name'}
                name={'areaName'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.areaName}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select"
                  value={selectedState}
                  label="State"
                  name='stateId'
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {states.map((item) => (
                    <MenuItem key={item.stateId} value={item.stateId}>{item.stateName}</MenuItem>
                  ))}
                </Select>

              </FormControl>
            </Grid>
            <Grid item spacing={3} md={4}>
              <FormControl fullWidth>
                <InputLabel>District</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select"
                  value={formik.values.districtId}
                  label={"District"}
                  name={'districtId'}
                  onChange={formik.handleChange}
                >
                  {districts.map((item) => (
                    <MenuItem key={item.districtId} value={item.districtId}>{item.districtName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.areaPinCode && formik.errors.areaPinCode)}
                fullWidth
                helperText={formik.touched.areaPinCode && formik.errors.areaPinCode}
                label={'Pin code'}
                name={'areaPinCode'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.areaPinCode}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.areaLatitude && formik.errors.areaLatitude)}
                fullWidth
                helperText={formik.touched.areaLatitude && formik.errors.areaLatitude}
                label={'Latitude'}
                name={'areaLatitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.areaLatitude}
              />
            </Grid>
            <Grid item spacing={3} md={4}>
              <TextField
                error={!!(formik.touched.areaLongitude && formik.errors.areaLongitude)}
                fullWidth
                helperText={formik.touched.areaLongitude && formik.errors.areaLongitude}
                label={'Longitude'}
                name={'areaLongitude'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={'text'}
                value={formik.values.areaLongitude}
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

export default UpdateArea;
