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