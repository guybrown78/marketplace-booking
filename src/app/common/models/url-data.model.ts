export class UrlQueryData {
	entrydata:EntryQueryData
	resultsdata:ResultsQueryData
}

export class EntryQueryData {
	delegateIds:string[]
	tenant: string
	tenantId: string
}
export class ResultsQueryData {
	type:string
	url:string
}