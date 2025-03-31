async function getApiResponse(url) {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error fetching data from API:", error);
    return null;
  }
}

export { getApiResponse };
