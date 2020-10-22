import {
	animation, 
	trigger, 
	animateChild, 
	group,
	transition, 
	animate, 
	style, 
	query
} from '@angular/animations';

export const fadeInOutAnimation =
	trigger('fadeInOut', [
		transition(':enter', [
			style({ opacity:0 }),
			animate('0.25s ease-in', style({ opacity: 1 }))
		]),
		transition(':leave', [
			animate('0.25s ease-in', style({ opacity: 0 }))
		])
]);

export const delegateInOutAnimation =
	trigger('delegateInOut', [
		transition(':enter', [
			style({ opacity:0, maxHeight: '0px'}),
			animate('0.25s ease-in', style({ opacity: 1, maxHeight: '100%' }))
		]),
		transition(':leave', [
			animate('0.25s ease-in', style({ opacity: 0, maxHeight: '0px' }))
		])
]);

export const bookingItemInOutAnimation =
	trigger('itemInOut', [
		transition(':enter', [
			style({ opacity:0, height: '46px'}),
			animate('0.25s ease-in', style({ opacity: 1, height: '46px' }))
		]),
		transition(':leave', [
			animate('0.25s ease-in', style({ opacity: 0, height: '0px' }))
		])
]);