import { Scrollbar } from "@/components/scrollbar";
import { deleteDistrict, getDistricts } from "@/services/locations";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateDistrict from "@/sections/location/update-district";
import EditIcon from '@mui/icons-material/Edit';

const Districts = (props) => {
  const { reload, setReload } = props
  let [districts, setDistricts] = useState([])
  const [updatingDistrict, setUpdatingDistrict] = useState({})
  const [openDistrictModal, setOpenDistrictModal] = useState(false)

  const handleOpenDistrictModal = (item) => {
    setUpdatingDistrict(item)
    return setOpenDistrictModal(true)
  }

  const handleCloseDistrictModal = () => setOpenDistrictModal(false)

  const handleDeleteAction = (districtId) => {
    deleteDistrict(districtId)
      .then(() => setReload(Math.random()))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getDistricts().then((data) => {
      setDistricts(data)
    }).catch((err) => console.log(err))
  }, [reload])

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  District Name
                </TableCell>
                <TableCell>
                  State
                </TableCell>
                <TableCell>
                  Longitude
                </TableCell>
                <TableCell>
                  Latitude
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {districts.map((district) => (
                <TableRow
                  hover
                  key={district.districtId}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <Typography variant="subtitle2">
                        {district.districtName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {district.State.stateName}
                  </TableCell>
                  <TableCell>
                    {district.districtLatitude}
                  </TableCell>
                  <TableCell>
                    {district.districtLongitude}
                  </TableCell>
                  <TableCell>
                    {district.districtStatus}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenDistrictModal(district)}
                      sx={{ backgroundColor: '#E5D4FF', mx: 2 }}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteAction(district.districtId)}
                      sx={{ backgroundColor: 'red' }} >
                      <DeleteIcon sx={{ color: '#fff', ":hover": { color: 'red' } }} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <UpdateDistrict open={openDistrictModal} handleClose={handleCloseDistrictModal} data={updatingDistrict} setReload={setReload} />
    </Card>
  );
}

export default Districts
