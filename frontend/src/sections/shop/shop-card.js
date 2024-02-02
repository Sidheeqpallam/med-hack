import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useRouter } from 'next/navigation';


export const ShopCard = (props) => {
  const { shop } = props;
  const router = useRouter()

  const gotToShopDetailsPage = (shopId) => {
    router.push(`/shop/${shopId}`)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          ':hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => gotToShopDetailsPage(shop.shopId)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        > {shop.logo ?
          <Avatar
            src={shop.logo}
            variant="square"
            sx={{ height: '40px', width: '40px' }}
          />
          : <BusinessIcon sx={{ height: '40px', width: '40px' }} />
          }
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {shop.shopName}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {shop.shopMobileNo}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {shop.downloads} Downloads
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

ShopCard.propTypes = {
  shop: PropTypes.object.isRequired
};
