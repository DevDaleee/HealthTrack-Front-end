const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('API URL não configurada!');
}

export async function fetchData(endpoint: string): Promise<any> {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar dados');
  }
  const data = await response.json();
  return data;
}
