
export class ErrorModel {
  type:ErrorTypeEnum
  message:string
}

export enum ErrorTypeEnum
{
	SPACES_UNAVAILABLE = "SPACES_UNAVAILABLE",
	GENERAL = "GENERAL",
}
