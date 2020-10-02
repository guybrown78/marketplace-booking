All the calls in these examples are tennanted. It will be worth having a quick think about the untennanted calls once these are agreed but as yet, there are no user stories for this.

The API url examples are assumed as;

```
tenant.ontransform.com/api...
```
# Tenant

**GET** call to get the information about the tennant. This is called once and stored in the client. It will allow the client to construct delegates job roles sentances such as "Rigger at Wood"

```
tenant.ontransform.com/api/tenant
```

**RESPONSE**

```json 

{
  "results":[
    {
      "id":"001",
      "name":"Wood",
      "availableCourseTypes":[
        {
          "name":"eLearn",
          "id":"001",
          "value":"elearn"
        }
      ]
    }
  ]
}
```

# Delegate

**GET** calls to recieve delegate models. Variations in these entry points means you can get all delegates from a tennant, a single delegate in a tennant from an id and a selected list of delegates from multiple ids

```
tenant.ontransform.com/api/delegates

tenant.ontransform.com/api/delegates/id 

tenant.ontransform.com/api/delegates?id=id1,id2,id3,id4,id5

```
**RESPONSE** The return data will be a list of the neccessary delegate models;

```json 

{
  "results":[
    {
      "id":"001",
      "firstName":"Joe",
      "lastName":"Bloggs",
      "displayName":"Joe Bloggs", // is this possible?
      "jobRole":"Rigger"
    }
  ]
}

```
### Search

The delegates entry point should also be searchable on name values. When adding the name param as a search query for delegates, it will search for matches in all the models 'name' params, ie 'firstName' and 'lastName'

```
tenant.ontransform.com/api/delegates?search-param=name&search-value=bl
```
The response **results** are as above however the search object/parameters from the request is reiterated in the response. this is for clarity when doing multiple searches

```JSON
{
  "search":{
    "param":"name",
    "value":"bl"
  },
  "results":[
    {
      "id":"001",
      "firstName":"Joe",
      "lastName":"Bloggs",
      "displayName":"Joe Bloggs",
      "jobRole":"Rigger"
    }
  ]
}
```
>if this is going to be too slow, then the client can get all delegates in a tennant in simple format, ie (name and id). Then search on that. However, when we go un-tennanted is this going to be huge? Other options are to type 3 chars in the client and thenmake the initial call. as the user types more chars adding to that initial 3, the client sorts


# COURSE Names


**GET** calls to recieve the available courses within a tennant. The model which is returned in this call is as minimalist as possible. This is defined with the last part of the of the endpoint `name/`. 

It is purely to populate the subsequent search for courses call. 
The courses here are prefuxed after mp 'marketplace' as courses maybe a popular endpoint with a varient of its models.



```
tenant.ontransform.com/api/mp/courses/names
```

```json 

{
  "results":[
    {
      "id":"001",
      "name":"OPITO Basic H2S Training",
    }
  ]
}
```
### Search

Similar to the delegates, the UI should autocomplete suggestions for the course name. If we are doing this with API then

```
tenant.ontransform.com/api/mp/courses/names?search-param=name&search-value=bl
```
**response** 

```JSON
{
  "search":{
    "param":"name",
    "value":"h2s"
  },
  "results":[
    {
      "id":"001",
      "name":"OPITO Basic H2S Training",
    }
  ]
}
```

# COURSE 


**GET** call get all the information for a selected course.

This provides the initial search and then allows all the filter parameters to create the rest of the search UI


```
tenant.ontransform.com/api/mp/courses/available/:id
```
response
```json
[
  {
    "courseId":"001",
    "id":"001",
    "name":"OPITO Basic H2S Training",
    "type":{
      "name":"In-Centre",
      "id":"002",
      "value":"inCentre"
    },
    "location":{
      "name":"Name"
    },
    "supplier":{
      "name":"AIS-Training",
      "id":"001"
    },
    "startDates":[
      "Fri Oct 23 2020 07:39:41 GMT+0100 (British Summer Time)"
    ],
    "prices":{
			"current":"GBP",
			"total":"490",
			"incVat":false,
    },
    "availability":{
      "total":"20",
      "available":"8"
    }
  }
]
```
>location: lat/lang? town/city/county

>supplier: supplier logo url?

>startDates: what date format are in the DB?

>prices: simple total for now but in a object to allow for future functionalit such as discounts, different tax etc,

>availability: not sure we need the total but example on how it can expand in future

> !!!!! if the filters are meant to make calls then this is going to need more thought

----------
from this data. the UI allows to filter from n courses.

1. filtering on location, the client can scrape or the locations from the list (doesn't solve spelling/errors etc)
2. type, the client can get all the types and match them with allowed types from tenant to create DD
3. start date, the client accepts a single date, then only displays courses that are after that date
4. supliers, list all courses grouped by their suppliers unique id
5. type, list all courses grouped by their type unique id