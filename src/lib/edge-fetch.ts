// Легкий helper під Edge Runtime (middleware). Без axios.
export async function edgeFetchMe(meUrl: string, cookie: string | null) {
  return fetch(meUrl, {
    method: 'GET',
    headers: cookie ? { cookie } : {},
    credentials: 'include',
    cache: 'no-store',
  });
}
