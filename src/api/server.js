const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const parse = require('csv').parse
const mysql = require('mysql')
const pgp = require('pg-promise')(/* options */)
const sql = require('mssql')
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { reset } = require('nodemon');
const app = express();
const port = 5000;

require('dotenv').config();


const config = {
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

console.log('config', config)
const db = pgp('postgres://uname:password@localhost:5432/postgis')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors());

app.options("*", cors());

app.post("/datasource", async (req, res) => {
  const url = `http://localhost:3101/api/datasources`;
  const db_name = 'grafana';
  const db_url = 'localhost:6543';
  const db_username = '';
  const db_password = '';
  const grafana_api_token = ``;

  const body = {
    "orgId": 1,
    "name": `${db_name}`,
    "type": "postgres",
    "typeLogoUrl": "",
    "access": "proxy",
    "url": `${db_url}`,
    "user": `${db_username}`,
    "database": "",
    "basicAuth": false,
    "basicAuthUser": "",
    "withCredentials": false,
    "isDefault": false,
    "jsonData": {
      "maxOpenConns": 100,
      "maxIdleConns": 100,
      "maxIdleConnsAuto": true,
      "connMaxLifetime": 14400,
      "database": "grafana",
      "sslmode": "disable",
      "postgresVersion": 1500
    },
    "secureJsonFields": {},
    "version": 2,
    "readOnly": false,
    "secureJsonData": {
      "password": `${db_password}`,
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${grafana_api_token}`
  }

  const payload = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(body),
  }

  console.log('payload', payload)

  try {
    const response = await fetch(url, payload);
    console.log('response', response)
    const data = await response.json();
    return res.json(data);
  } catch (e) {
    console.log('Error', e)
    throw e;
  }

})

app.get("/api/v2/organizations", (req, res) => {
  let raw = [
    {
    "name": "string",
    "description": "string",
    "userData": {
    "additionalProp1": {}
    },
    "nodeApprovalMode": "AUTOMATIC",
    "tags": [
    "string"
    ],
    "fields": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
    },
    "id": 0
    }
    ]

  return res.send(raw);
});

app.get("/api/v2/activities", (req, res) => {
  let raw = {
    "lastActivityId": 0,
    "activities": [
      {
        "id": 0,
        "activityTime": 0,
        "deviceId": 0,
        "severity": "NONE",
        "priority": "NONE",
        "seriesUid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "activityType": "ACTIONSET",
        "statusCode": "START_REQUESTED",
        "status": "string",
        "activityResult": "SUCCESS",
        "sourceConfigUid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "sourceName": "string",
        "subject": "string",
        "userId": 0,
        "message": "string",
        "type": "string",
        "data": {
          "additionalProp1": {}
        }
      }
    ]
  }
  return res.send(raw);
});

app.get('/rosa/clusters', (req, res) => {
  const json =
    [
      {
      "clusterid":  1,
      "name": "cluster1"
      },
      {
        "clusterid":  2,
        "name": "cluster2"
      },      
  ];

  return res.json(json)
});

app.get('/rosa/:cluster_id/nodes', (req, res) => {
  
  const json =
    [
      {
      "clusterid": 1,
      "nodeid":  1,
      "nodename": "node1",
      "cpu": 13,
      "disk": 355
      },
      {
        "clusterid": 1,
        "nodeid":  2,
        "name": "node2",
        "cpu": 33,
        "disk": 123        
      },      
  ];

  let data = json.filter((n) => n.clusterid == req.params.cluster_id);
  
  return res.json(data)
});
app.get("/api/v2/devices", (req, res) => {
  let raw = [
    {
      "id": 0,
      "parentDeviceId": 0,
      "organizationId": 0,
      "locationId": 0,
      "nodeClass": "WINDOWS_SERVER",
      "nodeRoleId": 0,
      "rolePolicyId": 0,
      "policyId": 0,
      "approvalStatus": "PENDING",
      "offline": true,
      "displayName": "string",
      "systemName": "string",
      "dnsName": "string",
      "netbiosName": "string",
      "created": 0,
      "lastContact": 0,
      "lastUpdate": 0,
      "userData": {
        "additionalProp1": {}
      },
      "tags": [
        "string"
      ],
      "fields": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "maintenance": {
        "status": "PENDING",
        "start": 0,
        "end": 0
      },
      "references": {
        "organization": {
          "name": "string",
          "description": "string",
          "userData": {
            "additionalProp1": {}
          },
          "nodeApprovalMode": "AUTOMATIC",
          "tags": [
            "string"
          ],
          "fields": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          },
          "id": 0
        },
        "location": {
          "name": "string",
          "address": "string",
          "description": "string",
          "userData": {
            "additionalProp1": {}
          },
          "tags": [
            "string"
          ],
          "fields": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          },
          "id": 0
        },
        "rolePolicy": {
          "id": 0,
          "parentPolicyId": 0,
          "name": "string",
          "description": "string",
          "nodeClass": "WINDOWS_SERVER",
          "updated": 0,
          "nodeClassDefault": true,
          "tags": [
            "string"
          ],
          "fields": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          }
        },
        "policy": {
          "id": 0,
          "parentPolicyId": 0,
          "name": "string",
          "description": "string",
          "nodeClass": "WINDOWS_SERVER",
          "updated": 0,
          "nodeClassDefault": true,
          "tags": [
            "string"
          ],
          "fields": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          }
        },
        "role": {
          "id": 0,
          "name": "string",
          "description": "string",
          "nodeClass": "WINDOWS_SERVER",
          "custom": true,
          "chassisType": "UNKNOWN",
          "created": 0,
          "tags": [
            "string"
          ],
          "fields": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          }
        },
        "backupUsage": {
          "revisionsCurrentSize": 0,
          "revisionsPreviousSize": 0,
          "revisionsDeletedSize": 0,
          "localFileFolderSize": 0,
          "localImageSize": 0,
          "cloudFileFolderSize": 0,
          "cloudImageSize": 0,
          "revisionsTotalSize": 0,
          "cloudTotalSize": 0,
          "localTotalSize": 0
        }
      }
    }
  ]
  return res.send(raw);
});

app.get("/provinces", (req, res) => {
  let raw = fs.readFileSync(
    "./data/limits_IT_provinces.geojson"
  );
  let geojson = JSON.parse(raw);
  let properties = geojson.features.map((p) => p.properties);

  return res.send(properties);
});

app.get('/metrics', (req, res) => {

  const json =
    [{
      "columns": [{ "text": "Time", "type": "time" }, { "text": "Country", "type": "string" }, { "text": "Number", "type": "number" }],
      "rows": [[1234567, "BE", 123], [1234567, "GE", 231], [1234567, "PS", 321]], "type": "table"
    }];

  return res.json(json)

})

app.get("/provinces/:prov_istat_code_num", (req, res) => {
  console.log('req.params', req.params)
  let geojson = fs.readFileSync(
    "./data/limits_IT_provinces.geojson"
  );
  let featureCollection = JSON.parse(geojson);
  let prov_istat_code_num = req.params.prov_istat_code_num;
  let feature;

  if (!prov_istat_code_num === '-1') {
    feature = featureCollection.features.filter(function (feature) {
      return feature.properties.prov_istat_code_num === parseInt(prov_istat_code_num);
    });
  }


  province = {};
  province.type = "FeatureCollection";
  province.bbox = [
    6.62662136853768, 35.493691935511417, 18.52038159909892, 47.091783746462159,
  ];
  province.features = feature;

  return res.send(province);
});

app.get('/elastic', (req, res) => {

  let rawdata = fs.readFileSync('./data/elastic.json');
  //let elastic = JSON.parse(rawdata);
  return res.send(rawdata)
})


app.get('/hi', (req, res) => {


  sql.connect(config).then(pool => {
    // Query

    return pool.request()
      .query(`WITH cte_org AS (
              SELECT [id], [Part] as Name, [ParentId]  as Parent
              FROM [dbo].[Assets]   
             WHERE [ParentId] IS NULL
              UNION ALL
              SELECT e.[id], e.[Part] as Name, e.[ParentId]
             FROM [dbo].[Assets] e 
             JOIN cte_org o  ON o.[id] = e.[ParentId]
          )
          
          SELECT id, name, parent
            FROM cte_org`)
  }).then(result => {
    let items = [{ "Id": 1, "Name": "HeaterAsset", "Parent": null }, { "Id": 8, "Name": "FanAsset", "Parent": null }, { "Id": 9, "Name": "Body", "Parent": 8 }, { "Id": 11, "Name": "Motor", "Parent": 8 }, { "Id": 12, "Name": "Coil", "Parent": 11 }, { "Id": 13, "Name": "Shaft", "Parent": 11 }, { "Id": 10, "Name": "Fance", "Parent": 9 }, { "Id": 3, "Name": "Body", "Parent": 1 }, { "Id": 5, "Name": "GearBox", "Parent": 1 }, { "Id": 2, "Name": "Motor", "Parent": 5 }, { "Id": 7, "Name": "Gears", "Parent": 5 }, { "Id": 4, "Name": "Coil", "Parent": 2 }, { "Id": 6, "Name": "Shaft", "Parent": 2 }];
    let x = buildHierarchy(items)
    res.send(x)
  }).catch(err => {
    // ... error checks
    console.log(err)
  });
})

function buildHierarchy(arry) {

  var roots = [], children = {};

  // find the top level nodes and hash the children based on parent
  for (var i = 0, len = arry.length; i < len; ++i) {
    var item = arry[i],
      p = item.Parent,
      target = !p ? roots : (children[p] || (children[p] = []));

    target.push({ value: item });
  }

  // function to recursively build the tree
  var findChildren = function (parent) {
    if (children[parent.value.Id]) {
      parent.children = children[parent.value.Id];
      for (var i = 0, len = parent.children.length; i < len; ++i) {
        findChildren(parent.children[i]);
      }
    }
  };

  // enumerate through to handle the case where there are multiple roots
  for (var i = 0, len = roots.length; i < len; ++i) {
    findChildren(roots[i]);
  }

  return roots;
}

app.get('/geo', (req, res) => {

  let rawdata = fs.readFileSync('./data/earthquakes.geojson');
  let geo = JSON.parse(rawdata);
  return res.json(geo)
})

app.get('/postgis', (req, res) => {

  db.one('SELECT geo FROM public.stores', 123)
    .then((data) => {
      //return res.json(data.geo)
      return res.status(200).send(data.geo)
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
})

app.get('/read', (req, res) => {

  const data = fs.readFileSync('d:/grafana/grafana.csv')
  parse(data, {
    delimiter: ';',
    trim: true
  }, (err, records) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ success: false, message: 'An error occurred' })
    }
    return res.json({ data: records })
  })
})

app.get('/zz', (req, res) => {

  const data = fs.readFileSync('d:/grafana/grafana.csv')
  parse(data, {
    delimiter: ';',
    trim: true
  }, (err, records) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ success: false, message: 'An error occurred' })
    }
    return res.json({ data: records })
  })
})

app.get('/planets', (req, res) => {


  const MongoClient = require('mongodb').MongoClient

  MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
    if (err) throw err

    const db = client.db('grafana')

    db.collection('planets').find({ "name": "Mercury" }).toArray((err, result) => {
      if (err) throw err

      return res.json(result);
    })
  })

})

app.get('/nodes', (req, res) => {


  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

  connection.connect()

  connection.query('CALL nodes()', (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
    return res.json(rows[0])
  })

  connection.end()
})

app.get('/edges', (req, res) => {


  const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

  connection.connect()

  connection.query('SELECT * FROM edges n', (err, rows, fields) => {
    if (err) throw err

    return res.json(rows)
  })

  connection.end()
})

app.get('/', (req, res) => {

  const json = {
    "nodes": [
      {
        "id": 1,
        "title": "nginx",
        "mainStat": 21233,
        "arc__passed": 0.283,
        "passed_color": "green",
        "arc__failed": 0.717,
        "failed_color": "red",
      },
      {
        "id": 2,
        "title": "serviceA",
        "mainStat": 12000,
        "arc__passed": 0.167,
        "passed_color": "green",
        "arc__failed": 0.833,
        "failed_color": "red"
      },
      {
        "id": 3,
        "title": "serviceB",
        "mainStat": 8233,
        "arc__passed": 0.486,
        "passed_color": "green",
        "arc__failed": 0.514,
        "failed_color": "red"
      }
    ],
    "edges": {
      "id": "a",
      "source": 1,
      "target": 2
    }
  };
  return res.json(json)

})

app.get("/hosts", async (req, res) => {
  //https://docs-api.centreon.com/api/centreon-web/
  a = await authenticate();
  const headers = { 'X-AUTH-TOKEN': a.authToken };

  try {
    hostsurl = process.env.CENTREON_URL_PREFIX + process.env.CENTREON_VERSION + '/monitoring/hosts'
    const response = await fetch(hostsurl, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json()
    return res.json(data);
  } catch (e) {
    throw e.response ? e.response.body.message : e;
  }


});

async function authenticate() {
  const form = new FormData();
  form.append("username", process.env.CENTREON_USERNAME);
  form.append('password', process.env.CENTREON_PASSWORD);


  try {
    const url = process.env.CENTREON_URL_PREFIX + 'index.php?action=authenticate';
    const response = await fetch(url, { method: 'POST', body: form });
    const data = await response.json()
    return data;
  } catch (e) {
    throw e.response ? e.response.body.message : e;
  }
}
app.get('/stream', (req, res) => {


  const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

  connection.connect()

  connection.query('SELECT * FROM edges n', (err, rows, fields) => {
    if (err) throw err

    return res.json(rows)
  })

  connection.end()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})