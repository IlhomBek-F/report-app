const BASE_API = 'http://147.45.184.63:5000';

async function getData() {
    const response = await fetch(BASE_API);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

async function calculateCoef(data: any) {
 const response = await fetch(`${BASE_API}/calc`, 
  {method: 'POST', body: JSON.stringify(data), headers: {
    "Content-Type": "application/json",
  }}
);

 if(!response.ok) {
  throw new Error(`Error calculating data: ${response.status} ${response.statusText}`)
 }

 return response.json()
}

export {getData, calculateCoef}