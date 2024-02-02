import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Icon, SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Doctors',
    path: '/doctor',
    icon: (
      <SvgIcon fontSize="small">
        <MedicalServicesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Hospitals',
    path: '/hospital',
    icon: (
      <SvgIcon fontSize="small">
        <LocalHospitalIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
];
