import { Scrollbar } from "@/components/scrollbar";
import { deleteState, getStates } from "@/services/locations";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateState from "@/sections/location/update-state";
import EditIcon from '@mui/icons-material/Edit';

const States = (props) => {
  const { reload, setReload } = props
  let [states, setStates] = useState([])
  const [updatingState, setUpdatingState] = useState({})
  const [openStateModal, setOpenStateModal] = useState(false)

  const handleOpenStateModal = (item) => {
    setUpdatingState(item)
    return setOpenStateModal(true)
  }

  const handleCloseStateModal = () => setOpenStateModal(false)

  const handleDeleteAction = (areaId) => {
    deleteState(areaId)
      .then(() => setReload(Math.random()))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getStates().then((data) => {
      setStates(data)
    })
  }, [reload])

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  State Name
                </TableCell>
                <TableCell>
                  Country
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
              {states.map((state) => (
                <TableRow
                  hover
                  key={state.stateId}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <Typography variant="subtitle2">
                        {state.stateName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {state.Country.countryName}
                  </TableCell>
                  <TableCell>
                    {state.stateLatitude}
                  </TableCell>
                  <TableCell>
                    {state.stateLongitude}
                  </TableCell>
                  <TableCell>
                    {state.stateStatus}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenStateModal(state)}
                      sx={{ backgroundColor: '#E5D4FF', mx: 2 }}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteAction(state.stateId)}
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
      <UpdateState open={openStateModal} handleClose={handleCloseStateModal} data={updatingState} setReload={setReload} />
    </Card>
  );
}

export default States
