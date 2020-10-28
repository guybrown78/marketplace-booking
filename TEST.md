# Testing the UI

The app is built in angular and on production build, the scully lib compile the build to a static site. This is automated within Netlify on every commit to the `live` branch. It can be viewed here;

[https://tf-mp.netlify.app](https://tf-mp.netlify.app)

and a test tenant host [https://serica.netlify.app](https://serics.netlify.app)

# Entry Points

The app accepts and stores JSON objects in the query. These are detailed in the [API calls](https://github.com/guybrown78/marketplace-booking/blob/master/API.md) documentation. 


## EntryData

`?entrydata={}`

### Pass in tenant
The tenant can be passed into the app via the `tenant` param

`?entrydata={"tenant":"altrad"}`

This is the URL to use to pass in the tenant  for:


- Altrad
[https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22altrad%22%7D](https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22altrad%22%7D)
- Serica
[https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22serica%22%7D](https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22serica%22%7D)

If you pass in the tenant as above, this will be the tenant that the app uses to form the entry data.

If no tenant is passed in via the query string, then the app will attempt to read the host url and get the string between `https://` and the first `.`

for example, with this url;

https://serico.netlify.app

it will assume the tenant is `serico`.

It will then make a test call to get the tenant information. If results are returned, it will store `serico` as the tenant and use throughout.

In this (no entry data) example, https://tf-mp.netlify.app the app will read the tennant as `tf-mp`. It will make a test call to get the tenant data which should error. On Error, the app will fallback to the default tenant set in the config _mpConfigTenant which is currently set to `transform`



### Pass in a single delegateId
A single delegateId can be passed within the `delegateIds` array. 

?entrydata={"tenant":"altrad","delegateIds":["29243"]}


- Arron Walker at Altrad [https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22altrad%22,%22delegateIds%22:%5B%2263121%22%5D%7D](https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22altrad%22,%22delegateIds%22:%5B%2263121%22%5D%7D)
- Dave Oliver at Wood [https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22woodgroup%22,%22delegateIds%22:%5B%2263128%22%5D%7D](https://tf-mp.netlify.app/?entrydata=%7B%22tenant%22:%22woodgroup%22,%22delegateIds%22:%5B%2263128%22%5D%7D)

