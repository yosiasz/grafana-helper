async function getClusters() {
  fetch('http://localhost:8080/v1/statement', {
	method: 'POST',
	mode: "no-cors", // no-cors, *cors, same-origin
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
		'X-Trino-User': 'root',
      'X-Trino-Catalog': 'tpch',
      'X-Trino-Schema': 'sf1',
    })
  })
    .then(function (response) {
      console.log('then 1', response)
      return response.json()
    })
    .then(function (data) {
      console.log('then 2', data)
      return data;
    }).catch(error => console.error('Error:', error));

}

let d = getClusters()
console.log(d)
