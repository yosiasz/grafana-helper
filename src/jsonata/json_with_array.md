```consolecode
{
    "value" : 45000,
    "timestamp" : 1678709584000,
    "car_brands":[
      {
        "name": "BMW",
        "perc": 10
      },
      {
        "name": "MERCEDES",
        "perc": 10
      },
        {
        "name": "AUDI",
        "perc": 80
      }
    ]
}
```

```
(

    $A := $map($, function($v, $i, $a) {
       {
           'incidentName': $v.incidentName,
            'priority': $v.priority,
            'time': $v.startTime
       }
    });
   $B :=
   $map($, function($v, $i, $a) {
       {
           'incidentName': $v.incidentName,
            'priority': $v.priority,
            'time':   $exists($v.endTime) ? $substring($v.endTime,0,10) : $substring($v.startTime,0,10)
       }
    });
    $final := $append($A, $B);
    $final^(incidentName, time);

)
```

```
(
    $value := $.value;
    $time := $.timestamp;
    $map($.car_brands, function($v, $i, $a) {
       {
           "value": $value,
            "name": $v.name,
            "time": $time
       }
    })
)
{
  "c": [
    170.29,
    170.77,
    173.97
  ],
  "h": [
    171.17,
    170.9,
    174.23
  ],
  "l": [
    168.87,
    167.9,
    170.12
  ],
  "o": [
    169.02,
    169.35,
    171
  ],
  "s": "ok",
  "t": [
    1698638400,
    1698724800,
    1698811200
  ],
  "v": [
    51130955,
    44846017,
    56934906
  ]
}
```

```console
(
  $map($.t, function($v, $i, $a) {
       {
            "date": $v,
            "opening" : $.o[$i],
            "high": $.h[$i] ,
            "low": $.l[$i] ,
            "close": $.c[$i],
            "volume": $.v[$i]
       }
    })
)
```

if it is an array of things.

```console
(
    $bysymbol := $filter($, function($v, $i, $a) {
        $v.s = "ok"
    });
  $map($bysymbol.t, function($v, $i, $a) {
       {
            "date": $v,
            "opening" : $bysymbol.o[$i],
            "high": $bysymbol.h[$i] ,
            "low": $bysymbol.l[$i] ,
            "close": $bysymbol.c[$i],
            "volume": $bysymbol.v[$i],
            "symbol": $bysymbol.s
       }
    })
)
```

```json
{
  "nextPageKey": null,
  "resolution": "1m",
  "result": [
    {
      "data": [
        {
          "dimensionMap": {
            "dt.entity.host.name": "hostxxx@yyy.com"
          },
          "dimensions": ["hostxxx@yyy.com"],
          "timestamps": [
            1701090120000, 1701090180000, 1701090240000, 1701090300000,
            1701090360000
          ],
          "values": [
            90.19648106892903, 90.06653912862141, 91.63350741068523,
            91.0315596262614, 92.09268697102864
          ]
        }
      ],
      "dataPointCountRatio": 0.00006,
      "dimensionCountRatio": 0.0001
    }
  ],
  "totalCount": 10
}
```

```console
( $map($.result.data.timestamps, function($v, $i, $a) { { 'timestamp': $fromMillis($v), 'value': $.result.data.values[$i] } }) )
```

Add an extra field to array

```json
[
  {
    "balance": 55,
    "credit": 0,
    "prepayment": 10.04,
    "pending_costs": 4.58
  },
  {
    "balance": 7,
    "credit": 0,
    "prepayment": 11.04,
    "pending_costs": 14.58
  }
]
```

```console
$ ~> |$|{ "transation_date": $now() }|

$map($, function($v, $i, $a) {  {  'timestamp': $fromMillis($toMillis($now()) + $i*100000) ,   'balance': $v.balance   } })

```

Loop by key: keys.json

```console
(
  $data := $map($keys($), function($v) {$lookup($, $v).data})[0];$map($data, function($v, $i, $a) {{'time': $v[0],'uno': $v[1],'dos': $v[2],'tres': $v[3]}})
)
```
