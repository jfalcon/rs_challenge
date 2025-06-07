// these aren't in the global config to keep them self contained
// as a new vendor may not need the same inputs for a request
const ENDPOINT = "https://api.weatherapi.com/v1/current.json";
const KEY = (process.env.WEATHER_KEY || "").trim();

export async function getForCity(city: string) {
  const response = await fetch(
    `${ENDPOINT}?key=${encodeURIComponent(KEY)}&q=${encodeURIComponent(city)}`,
    {
      method: "GET", // TODO: eventually type the verbs
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
