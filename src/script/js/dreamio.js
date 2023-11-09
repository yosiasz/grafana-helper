let body = 'select *, now() from tpch.sf1.orders  order by orderkey asc limit 3';
let url = 'http://localhost:9047/apiv2/login'

let username = 'admin'
let password = 'Semrina77!!'
let headers = {'content-type':'application/json'}
let dremioServer = 'http://localhost:9047'

(async () => {
  const orders = await fetch(url, headers=headers, data=json.dumps(loginData));
  
})();

let data = await fetch(url);
/* 
loginData = {'userName': username, 'password': password}
  response = requests.post('http://demo.drem.io:9047/apiv2/login', headers=headers, data=json.dumps(loginData))
  data = json.loads(response.text)
  //retrieve the login token
  token = data['token']
  return {'content-type':'application/json', 'authorization':'_ dremio{authToken}'.format(authToken=token)}

  headers = login(username, password) 
*/