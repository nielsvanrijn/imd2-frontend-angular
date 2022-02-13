import {animate, state, style, transition, trigger} from '@angular/animations';

export const verticalCollapseAnimation = trigger('verticalCollapse', [
	state('*', style({
		height: '*',
	})),
	state('void', style({
		height: '0',
	})),
	transition('* => void', animate('.3s .3s ease')),
]);

export const slidingDoorAnimation = trigger('slidingDoorAnimation', 
	[
		state('in', 
			style({ width: '{{ inWidth }}', overflow:'hidden'}),
			{ params: { inWidth: '250px'}}
		),
		state('out', 
			style({ width: '{{ outWidth }}'}),
			{ params: { outWidth: '*'}}
		),
		transition('* <=> *',animate('{{ time }}'))
	]
);

export const fadeInAnimation = trigger('fadeInAnimation', 
	[
		transition(
			':enter', 
			[
				style({ opacity: 0 }),
				animate('{{ d }}', style({ opacity: 1 }))
			]
		)
	]
);

export const dropdownHideShowAnimation = trigger('dropdownHideShowAnimation',
	[
		transition(
			':enter', 
			[
				style({ opacity: 0, transform: 'scale(0.95, 0.95)' }),
				animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1, 1)' }))
			]
		),
		transition(
			':leave', 
			[
				style({ opacity: 1, transform: 'scale(1, 1)' }),
				animate('75ms ease-in', style({ opacity: 0, transform: 'scale(0.95, 0.95)' }))
			]
		)
	]
);

export const selectHideShowAnimation = trigger('singleSelectHideShowAnimation',
	[
		// transition(
		// 	':enter', 
		// 	[
		// 		style({ opacity: 0, transform: 'scale(0.95, 0.95)' }),
		// 		animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1, 1)' }))
		// 	]
		// ),
		transition(
			':leave', 
			[
				style({ opacity: 1 }),
				animate('100ms ease-in', style({ opacity: 0 }))
			]
		)
	]
);