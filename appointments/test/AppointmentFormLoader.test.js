import React from 'react';
import 'whatwg-fetch';
import { createContainer } from './domManipulators';
import { fetchResponseOk } from './spyHelpers';
import {
	AppointmentFormLoader
} from '../src/AppointmentFormLoader';
import * as AppointmentFormExports from '../src/AppointmentForm';

describe('AppointmentFormLoader', () => {
	let renderAndWait, render, container;

	const today = new Date();
	const availableTimeSolts = [
		{ startsAt: today.setHours(9, 0, 0, 0) }
	];

	beforeEach(() => {
		({ renderAndWait, render, container } = createContainer());
		jest
			.spyOn(window, 'fetch')
			.mockReturnValue(fetchResponseOk(availableTimeSolts));
		jest
		.spyOn(AppointmentFormExports, 'AppointmentForm')
		.mockReturnValue(null);
	});

	afterEach(() => {
		window.fetch.mockRestore();
    	AppointmentFormExports.AppointmentForm.mockRestore();
	});

	it('fetches data when component is mounted', () => {
		render (<AppointmentFormLoader />);
		expect(window.fetch).toHaveBeenCalledWith(
			'/availableTimeSlots',
			expect.objectContaining({
				method: 'GET',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' }
			})
		);
	});

	it('initially passes no data to AppointmentForm', () => {
		render(<AppointmentFormLoader />);
		expect(
			AppointmentFormExports.AppointmentForm
		).toHaveBeenLastCalledWith(
			{ availableTimeSlots: [] },
			expect.anything()
		);
	});



	it('displays time slots that are fetched on mount', async () => {
		await renderAndWait(<AppointmentFormLoader />);

		expect(
			AppointmentFormExports.AppointmentForm
		).toHaveBeenLastCalledWith(
			{
				availableTimeSlots
			},
			expect.anything()
		);
	});

});

