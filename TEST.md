# Testing the UI

The app is built in angular and on production build, the scully lib compile the build to a static site. This is automated within Netlify on every commit to the `master` branch. It can be viewed here;

[https://tf-marketplace.netlify.app](https://tf-marketplace.netlify.app)

# Entry Points

The app accepts and stores JSON objects in the query. These are detailed in the [API calls](https://github.com/guybrown78/marketplace-booking/blob/master/API.md) documentation. 


## EntryData

`?entrydata={}`

### Pass in tenant
The tenant can be passed into the app via the `tenant` param

`?entrydata={"tenant":"altrad"}`

This is the URL to use to pass in the tenant  for:

- Altrad
[https://tf-marketplace.netlify.app/?entrydata=%7B%22tenant%22:%22altrad%22%7D](https://tf-marketplace.netlify.app/?entrydata=%7B%22tenant%22:%22woodgroup%22%7D)
- Wood
[https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22d5d7e332-0aaf-4c78-86fb-e9b71ccab4f4%22%7D](https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22d5d7e332-0aaf-4c78-86fb-e9b71ccab4f4%22%7D)

### Pass in a single delegateId
A single delegateId can be passed within the `delegatesIds` array. 

- Arron Walker at Altrad [https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22679e8ced-6c32-441d-9fdc-d806180e27f7%22,%22delegateIds%22:%5B%2263121%22%5D%7D](https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22679e8ced-6c32-441d-9fdc-d806180e27f7%22,%22delegateIds%22:%5B%2263121%22%5D%7D)
- Dave Oliver at Wood [https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22d5d7e332-0aaf-4c78-86fb-e9b71ccab4f4%22,%22delegateIds%22:%5B%2263128%22%5D%7D](https://tf-marketplace.netlify.app/?entrydata=%7B%22tenantId%22:%22d5d7e332-0aaf-4c78-86fb-e9b71ccab4f4%22,%22delegateIds%22:%5B%2263128%22%5D%7D)


### Pass in multiple delegateIds
TODO

## ReturnData
### Pass in return URL once course is booked
TODO

# Static Data Calls

The app uses these [API calls](https://github.com/guybrown78/marketplace-booking/blob/master/API.md) to retrieve and set data. During the dev process, the API will link to `fake data` which has been made up and served from these following endpoints;

[Tenants Data](https://my-json-server.typicode.com/guybrown78/api-tenants/db)

[Tenant Data (example: altrad)](https://my-json-server.typicode.com/guybrown78/api-tenants/results/679e8ced-6c32-441d-9fdc-d806180e27f7)

[All Delegates Data](https://my-json-server.typicode.com/guybrown78/api-delegates/db)

[Delegate Data (single delegate)](https://my-json-server.typicode.com/guybrown78/api-delegates/results/63121)

[Courses Data](https://my-json-server.typicode.com/guybrown78/api-courses/db)

[Course Schedules Data](https://my-json-server.typicode.com/guybrown78/api-course/db)
> The course data is the searched schedules for the selected course `OPITO Basic H2S Training` which is `id:133`

[Course Schedules Data (empty)](https://my-json-server.typicode.com/guybrown78/api-course-137/db)
> The empty course data is the searched schedules for the selected course `OPITO Combined BOSIET` which is `id:137`