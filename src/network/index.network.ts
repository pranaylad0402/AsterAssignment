const BASE_URL = 'https://run.mocky.io';

// Function to handle the API response
async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

// Function to handle API errors
function handleError(error: Error) {
  console.error('API call failed:', error.message);
  throw error;
}

// Wrapper function for making API calls
async function callApi({
  endpoint = '',
  options = {},
}: {
  endpoint: string;
  options?: ResponseInit;
}) {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, options);
    const data = await handleResponse(response);
    return data;
  } catch (error: any) {
    handleError(error);
  }
}

export default callApi;
