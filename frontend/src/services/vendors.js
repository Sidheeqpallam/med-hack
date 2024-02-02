import { API_URL } from "@/utils/constants";
import axios from "axios";

export async function postShop(shopData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.post(`${API_URL}/admin/vendor/shops`, shopData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(data, 'response of data')
  } catch (error) {
    console.error('There was a problem in creating shop: ', error.response.data);
    throw new Error('Something issue');
  }
}

export async function getShops() {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.get(`${API_URL}/admin/vendor/shops`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return data.data
  } catch (error) {
    console.error('There was a problem in creating shop: ', error.response.data);
    throw new Error('Something issue');
  }
}


export async function getShopDetails(shopId) {
  try {
    const { data } = await axios.get(`${API_URL}/web/vendors/shops/${shopId}`)
    console.log(data)
    return data.data
  } catch (error) {
    console.error('There was a problem in creating shop: ', error.response.data);
    throw new Error('Something issue');
  }
}
