import expect from 'expect';
import * as actions from '../../../../src/<%= module %>/actions/<%= action %>';
import * as types from '../../../../src/<%= module %>/constants/<%= module %>Constants';

// import * as data from '';
// import { mockStore } from '../../utils/mockStoreWithMiddleware';
// import * as api from '';
// import Q from 'q';
// import sinon from 'sinon';

describe('<%= action %>Actions', () => {
  describe('<%= action %>Request', () => {
    it('returns a request action', () => {
      const expectedAction = {
        type: types.SAMPLE_REQUEST
      };
      expect(actions.<%= action %>Request()).toEqual(expectedAction);
    });
  });

  describe('<%= action %>Success', () => {
    it('returns a successful action', () => {
      const expectedAction = {
        type: types.SAMPLE_SUCCESS
      };
      expect(actions.<%= action %>Success()).toEqual(expectedAction);
    });
  });

  describe('<%= action %>Failure', () => {
    it('returns a failed action', () => {
      const error = 'Error message'
      const expectedAction = {
        type: types.SAMPLE_FAILURE,
        error: error
      };
      expect(actions.<%= action %>Failure(mockError)).toEqual(expectedAction);
    });
  });
});
