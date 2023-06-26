```
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
```