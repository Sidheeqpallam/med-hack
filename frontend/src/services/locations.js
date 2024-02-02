import { API_URL } from "@/utils/constants";
import axios from "axios";

export async function getDistricts(stateId) {
  try {
    const queryParams = new URLSearchParams();
    stateId ? queryParams.append('stateId', stateId) : null

    const response = await fetch(`${API_URL}/web/locations/districts?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network issue');
    }
    const responseData = await response.json();
    if (responseData.status !== 'success') {
      throw new Error('Data Not Found');
    }
    if (!responseData.data.length) {
      throw new Error('Data Not Found');
    }
    return (responseData.data);
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
};

export async function getAreas(districtId) {
  try {
    const queryParams = new URLSearchParams();
    districtId ? queryParams.append('districtId', districtId) : null
    const response = await fetch(`${API_URL}/web/locations/areas?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network issue');
    }
    const responseData = await response.json();
    if (responseData.status !== 'success') {
      throw new Error('Data Not Found');
    }
    if (!responseData.data.length) {
      throw new Error('Data Not Found');
    }
    return (responseData.data);
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
};

export async function postState(stateData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.post(`${API_URL}/admin/locations/states`, stateData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error('Something issue');
    }
    return
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function getStates() {
  try {
    const { data } = await axios.get(`${API_URL}/web/locations/states`)
    if (data.status !== 'success') {
      throw new Error('Something issue');
    }
    return data.data
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function postDistrict(districtData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.post(`${API_URL}/admin/locations/districts`, districtData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error(data.message);
    }
    return
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function postArea(areaData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.post(`${API_URL}/admin/locations/areas`, areaData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error(data.message);
    }
    return
  } catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function updateArea(areaId, areaData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.put(`${API_URL}/admin/locations/areas/${areaId}`, areaData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error(data.message);
    }
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function deleteArea(areaId) {
  try {
    if (!areaId) throw new Error('Id not found')
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.delete(`${API_URL}/admin/locations/areas/${areaId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') throw new Error('Something went wrong')
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function deleteState(stateId) {
  try {
    if (!stateId) throw new Error('Id not found')
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.delete(`${API_URL}/admin/locations/states/${stateId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') throw new Error('Something went wrong')
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function updateState(stateId, stateData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.put(`${API_URL}/admin/locations/states/${stateId}`, stateData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error(data.message);
    }
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function updateDistrict(districtId, districtData) {
  try {
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.put(`${API_URL}/admin/locations/districts/${districtId}`, districtData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') {
      throw new Error(data.message);
    }
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}

export async function deleteDistrict(districtId) {
  try {
    if (!districtId) throw new Error('Id not found')
    const token = localStorage.getItem('adminToken')
    const { data } = await axios.delete(`${API_URL}/admin/locations/districts/${districtId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (data.status !== 'success') throw new Error('Something went wrong')
    return
  } catch (error) {
    throw new Error(error.response?.data?.message ?
      error.response?.data?.message
      : 'Something went wrong');
  }
}
