export const _mpConfigTenant = "transform";
export const _mpConfigBaseEndpoint = ".uat.ontransform.com/tms/api/bookingform";
// the API endpoints are composed from...
//
// "https://" + tenant + _mpConfigBaseEndpoint
//
// 1 - If tenant is passed into the app via entryData ?entrydata:{"tenant":"altrad"} the api will be https://altrad.uat.ontransform.com/tms/api/bookingform
// 2 - If tenant is scraped from the url serica.netlify.app then the api will be https://serica.uat.ontransform.com/tms/api/bookingform
// 3 - If no tenant is passed or found, the app will use _mpConfigTenant and therefore the url will be https://transform.uat.ontransform.com/tms/api/bookingform
export const _mpConfigTaxPercent = 20;
export const _mpConfigTaxValue = 1 + (_mpConfigTaxPercent / 100); // 20% > n*1.2
export const _mpConfigTaxLabel = "VAT";
export const _mpConfigAltFormURL = "https://uat.ontransform.com";