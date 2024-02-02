import { Scrollbar } from "@/components/scrollbar";
import { deleteArea, getAreas } from "@/services/locations";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateArea from "@/sections/location/update-area";
import EditIcon from '@mui/icons-material/Edit';

const Areas = (props) => {
  const { reload, setReload } = props
  let [areas, setAreas] = useState([])
  const [updatingArea, setUpdatingArea] = useState({})
  const [openAreaModal, setOpenAreaModal] = useState(false)

  const handleOpenAreaModal = (item) => {
    setUpdatingArea(item)
    return setOpenAreaModal(true)
  }

  const hanldeCloseAreaModal = () => setOpenAreaModal(false)

  const handleDeleteAction = (areaId) => {
    deleteArea(areaId)
      .then(() => setReload(Math.random()))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAreas().then((data) => {
      setAreas(data)
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
                  Area Name
                </TableCell>
                <TableCell>
                  District
                </TableCell>
                <TableCell>
                  State
                </TableCell>
                <TableCell>
                  Pin code
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
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {areas.map((area) => (
                <TableRow
                  hover
                  key={area.areaId}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <Typography variant="subtitle2">
                        {area.areaName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {area.District?.districtName}
                  </TableCell>
                  <TableCell>
                    {area.District?.State?.stateName}
                  </TableCell>
                  <TableCell>
                    {area.areaPinCode}
                  </TableCell>
                  <TableCell>
                    {area.areaLatitude}
                  </TableCell>
                  <TableCell>
                    {area.areaLongitude}
                  </TableCell>
                  <TableCell>
                    {area.areaStatus}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenAreaModal(area)}
                      sx={{ backgroundColor: '#E5D4FF', mx: 2 }}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteAction(area.areaId)}
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
      <UpdateArea open={openAreaModal} handleClose={hanldeCloseAreaModal} data={updatingArea} setReload={setReload} />
    </Card>
  );
}

export default Areas
