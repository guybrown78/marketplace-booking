import { CoursePriceCurrency } from '../common/models/courses.model'

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const getCurencySymbol = (currency) => {
	switch(currency){
		case CoursePriceCurrency.GBP:
			return "£";
		case CoursePriceCurrency.USD:
			return "$";
		case CoursePriceCurrency.EUR:
			return "€";
	}
}