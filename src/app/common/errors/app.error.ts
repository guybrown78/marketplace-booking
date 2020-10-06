export class AppError {
	constructor(
		public originalError?: any,
		public notSynced: boolean = true
	) {
		//
	}
}