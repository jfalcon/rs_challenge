// these aren't in the global config to keep them self contained
// as a new vendor may not need the same inputs for a request
const ENDPOINT = "https://api.balldontlie.io/v1/teams";
const KEY = (process.env.NBA_KEY || "").trim();

export async function getTeams() {
  const response = await fetch(ENDPOINT, {
    method: "GET", // TODO: eventually type the verbs
    headers: {
      Accept: "application/json",
      Authorization: KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
