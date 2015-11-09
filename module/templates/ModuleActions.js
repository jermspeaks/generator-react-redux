import * as types from '../constants/<%= moduleConstants %>';

export function sampleRequest() {
	return {
		type: types.SAMPLE_REQUEST
	}
}

export function sampleSuccess() {
	return {
		type: types.SAMPLE_SUCCESS
	}
}

export function sampleFailure() {
	return {
		type: types.SAMPLE_FAILURE
	}
}
