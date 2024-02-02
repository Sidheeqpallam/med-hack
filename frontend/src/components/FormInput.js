import { Unstable_Grid2 as Grid, TextField } from "@mui/material"

const FormInput = (props) => {
  const { sx, formik, name, label, type } = props
  return (
    <Grid sx={sx} item spacing={3} md={4}>
      <TextField
        error={!!(formik.touched[name] && formik.errors[name])}
        fullWidth
        helperText={formik.touched[name] && formik.errors[name]}
        label={label}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={type}
        value={formik.values[name]}
      />
    </Grid>
  );
};

export default FormInput
