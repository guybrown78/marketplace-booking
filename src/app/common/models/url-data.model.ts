export class UrlQueryData {
	entrydata:EntryQueryData
	resultsdata:ResultsQueryData
}

export class EntryQueryData {
	delegateIds:string[]
	tennantId: string
}
export class ResultsQueryData {
	type:string
	url:string
}