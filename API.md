All the calls in these examples are tenanted. It will be worth having a quick think about the untenanted calls once these are agreed but as yet, there are no user stories for this.

The API url examples are assumed as;

```
tenant.ontransform.com/api/bookingform/...
```
# Tenant

**GET** call to get the information about the tenant. This is called once and stored in the client. It will allow the client to construct delegates job roles sentances such as "Rigger at Wood"


The entry URL will contain the tenant id, this is needed to make the initial tenant call

This api will have a slightly different URL as at this stage, we will only have a tenant ID and no tenant apiSuffix to construct the api. This will be a general rule within the application. If no tenant data is saved, the data entry points will start with the default 'transform'. (Could this be used as the entry point for non-tenanted states?).

```
transform.ontransform.com/api/bookingform/tenant/:id
```

**RESPONSE**

```json 

{
  "results":[
    {
			"id":"guid",
			"name":"Wood",
			"apiSuffix":"wood",
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
apiSuffix is what the api entry URL will start with, For example {apiSuffix}.ontransform.com/api... will result in wood.ontransform.com/api...

>Liam to firm up what the ID' will be for tenant and delegates, wether if comes from Coure MP (type will be GUID) or mutitenant (int?)

# Delegate


**GET** calls to recieve delegate models. Variations in these entry points means you can get all delegates from a tenant, a single delegate in a tenant from an id and a selected list of delegates from multiple ids

```
tenant.ontransform.com/api/bookingform/delegates

tenant.ontransform.com/api/bookingform/delegates/id 

tenant.ontransform.com/api/bookingform/delegates?id=id1,id2,id3,id4,id5

```
**RESPONSE** The return data will be a list of the neccessary delegate models;

```json 

{
  "results":[
    {
      "id":"001",
      "firstName":"Joe",
      "lastName":"Bloggs",
      "jobRole":"Rigger"
    }
  ]
}

```
>Liam to confirm delegate id type

### Search

The delegates entry point should also be searchable on name values. When adding the name param as a search query for delegates, it will search for matches in all the models 'name' params, ie 'firstName' and 'lastName'


```
tenant.ontransform.com/api/bookingform/delegates?search=name|bl
```

The response **results** are as above however the search object/parameters from the request is reiterated in the response. this is for clarity when doing multiple searches



```JSON
{
  "search":[{
    "param":"name",
    "value":"bl"
  }],
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

You can have multiple search params by adding additional search quiries. 
```
tenant.ontransform.com/api/bookingform/delegates?search=name|bl,robRole|Rig,location:N
```

Each search query is split with a `|` and that determins the name value pair.

For example, the query;
```
?search=name|bl,robRole|Rig,location:N
```
translates to
```
[
	{
    "param":"name",
    "value":"bl"
  },
	{
    "param":"jobRole",
    "value":"Rig"
  },
	{
    "param":"location",
    "value":"N"
  }
]
```

>if this is going to be too slow, then the client can get all delegates in a tenant in simple format, ie (name and id). Then search on that. However, when we go un-tenanted is this going to be huge? Other options are to type 3 chars in the client and thenmake the initial call. as the user types more chars adding to that initial 3, the client sorts


[Example Delegates JSON](https://my-json-server.typicode.com/guybrown78/api-delegates/db)

# COURSE Names


**GET** calls to recieve the available courses within a tenant. The model which is returned in this call is as minimalist as possible. This is defined with the last part of the of the endpoint `name/`. 

It is purely to populate the subsequent search for courses call. 
The courses here are prefuxed after mp 'marketplace' as courses maybe a popular endpoint with a varient of its models.



```
tenant.ontransform.com/api/bookingform/mp/courses/names
```

```json 

{
  "results":[
    {
      "standardId":"001",
      "name":"OPITO Basic H2S Training",
    }
  ]
}
```
### Search

Similar to the delegates, the UI should autocomplete suggestions for the course name. If we are doing this with API then

```
tenant.ontransform.com/api/bookingform/mp/courses/names?search=name|h2s
```
**response** 

```JSON
{
  "search":[{
    "param":"name",
    "value":"h2s"
  }],
  "results":[
    {
      "standardId":"001",
      "name":"OPITO Basic H2S Training",
    }
  ]
}
```

[EXAMPLE Course names JSON](https://my-json-server.typicode.com/guybrown78/api-courses/db)

# COURSE / SCHEDULES


**GET** call get all the information for a selected course.

This provides the initial search and then allows all the filter parameters to create the rest of the search UI


```
tenant.ontransform.com/api/bookingform/mp/courses/available?standardId=n
```
response

`standardId = GUID Course MP standard qual - this is the id we searched for`

`scheduledCourseId = id for scheduled course`

```json
[
  {
    "standardId":"001",
    "scheduledCourseId":"001",
    "name":"OPITO Basic H2S Training",
    "type":{
      "name":"In-Centre",
      "id":"002",
      "value":"inCentre"
    },
    "location":{
      "name":"Newcastle"
    },
    "supplier":{
      "name":"AIS-Training",
      "id":"001"
    },
    "startDate":"10/12/2020",
    "duration":{
      "days":4,
      "hours":null
    },
    "prices":{
      "currency":"GBP",
      "total":490,
      "incVat":false
    },
    "availability":{
      "total":20,
      "available":8
    }
  }
]
```


>location: lat/lang? town/city/county

>supplier: supplier logo url?

>startDates: what date format are in the DB?

>duration: Course duration model to allow course duration descriptions to be formed. If Vlearn/Elearn courses can set days/hours to null

>prices: simple total for now but in a object to allow for future functionalit such as discounts, different tax etc,

Course Prices Currency will be an Enum ISO 4217 Currency Codes [CurrencyCodes](https://gist.github.com/Aquazus/1a26a55ba7c38ed0363e0068d389cf30). In the application client, we will include;

```javascript
export enum CoursePriceCurrency
{
	GBP = "GBP",
	USD = "USD",
	AUD = "AUD",
	EUR = "EUR",
}
```

>availability: not sure we need the total but example on how it can expand in future

> This will give us enougth information to allow the client to organise the data and filter - if the filters are meant to make calls then this is going to need more thought

[Example Course/Schedules JSON](https://my-json-server.typicode.com/guybrown78/api-course/db)




--------------------------------------------------
from this data. the UI allows to filter from n courses.

1. filtering on location, the client can scrape or the locations from the list (doesn't solve spelling/errors etc)
2. type, the client can get all the types and match them with allowed types from tenant to create DD
3. start date, the client accepts a single date, then only displays courses that are after that date
4. supliers, list all courses grouped by their suppliers unique id
5. type, list all courses grouped by their type unique id

# SINGLE SCHEDULED COURSE

Using the above enpoint, instead of getting the all the scheduled courses from a standard, we can request just a single scheduled course from it's scheduledCourseId...

```
tenant.ontransform.com/api/bookingform/mp/courses/available?scheduledCourseId=n
```
This will return the same model as above, however it will only ever have one scheduleCourse model in the array

# BOOKING CONFIRMATION

The booking service call is derived from these [notes](./NOTES.md) that have been collected through varous conversations.

**POST** call to create the booking. 

```
tenant.ontransform.com/api/bookingform/book
```

**PAYLOAD**

```json 
{
  "scheduledCourseId":"001",
  "standardId":"001",
  "delegates":[
    {
      "id":"001"
    },
    {
      "id":"002"
    }
  ],
  "prices":{
    "currency":"GBP",
    "total":960,
    "incVat":false
  },
  "additionalNotes":{
    "poNumber":"",
    "level":"",
    "tmsCost":"",
    "trainingReason":""
  }
```

**RESPONSE** The return data will be a list of the neccessary delegate models;

if the booking process was a success, then send back the data in results...

```json 
{
  "results":[
    {
      "scheduledCourseId":"001",
      "standardId":"001",
      "delegates":[
        {
          "id":"001"
        },
        {
          "id":"002"
        }
      ],
      "prices":{
        "currency":"GBP",
        "total":960,
        "incVat":false
      },
      "additionalNotes":{
        "poNumber":"",
        "level":"",
        "tmsCost":"",
        "trainingReason":""
      }
    }
  ]
}
```

If the booking process failed, then error is passed back into the response through a generic error model;

Depending on the error type, the UI does two things. 

### 1. Handle too many delegates for the course availabilty
```json 
{
  "errors":[
    {
      "type":"SPACES_UNAVAILABLE",
      "message":"availableSpaces:3"
    }
  ]
}
```

If the error type = `SPACES_UNAVAILABLE` then this means that during the booking process, the course availabilty has been reduced for any reason. 

We should then allow the user the ability to remove delegates.

The client can perform some basic validation, making sure that the delegate count matches the new availabilty count. We want to keep the error model as generic as possible and because of this, we can use the error.message string to pass back the number of available spaces left to allow the client to perform its validation.

This process is repeated until a different error type or booking success.


### 2. Handle generic errors
```json 
{
  "errors":[
    {
      "type":"GENERAL",
      "message":"Something went wrong when we tried to save your bookings"
    }
  ]
}
```
Something happened that stopped the delegates being booked onto a course. This can be any reason other than availabilty (as above). The UI should show this and display the friendly message from the service.


The FrontEnd will detrmine error logic from these Error types;

```javascript
export enum CourseErrorType
{
	SPACES_UNAVAILABLE = "SPACES_UNAVAILABLE",
	GENERAL = "GENERAL",
}
```