import expect from 'expect';
import * as actions from '../../../../src/<%= module %>/actions/<%= action %>';
import * as types from '../../../../src/analytics/constants/AnalyticsConstants';
import * as api from '../../../../src/analytics/api/reportRest';
import { mockStore } from '../../utils/mockStoreWithMiddleware';
import * as data from '../data/mockContentReportData';
import sinon from 'sinon';
import Q from 'q';

describe('ReportContentReportActions', () => {
  describe('contentReportCardsRequest', () => {
    it('returns a request cards data action', () => {
      const expectedAction = {
        type: types.CONTENT_REPORT_CARDS_REQUEST
      };
      expect(actions.contentReportCardsRequest()).toEqual(expectedAction);
    });
  });

  describe('contentReportCardsSuccess', () => {
    it('should return a cards data successful action', () => {
      const mockResponse = data.mockCRCards;
      const expectedAction = {
        type: types.CONTENT_REPORT_CARDS_SUCCESS,
        data: data.mockCRCardsTransformedMapped.data,
        headers: data.mockCRCardsTransformedMapped.headers,
      };
      expect(actions.contentReportCardsSuccess(mockResponse)).toEqual(expectedAction);
    });
  });

  describe('contentReportCardsFailure', () => {
    it('should return a cards data failed action', () => {
      const mockError = 'Failed to fetch report';
      const expectedAction = {
        type: types.CONTENT_REPORT_CARDS_FAILURE,
        error: mockError
      };
      expect(actions.contentReportCardsFailure(mockError)).toEqual(expectedAction);
    });
  });

  describe('getContentReportCards', () => {
    let stub;
    const sortParams = [{
      name: 'pageViews',
      isAscending: true,
      optionName: 'Min',
      displayName: 'Min Page Views',
      key: 'min-page-views',
      type: 'category'
    }];
    const filterParams = [{
      name: 'datetime',
      type: 'date_range',
      value: {
        minutes: 30
      },
      displayName: 'Last 30 Minutes',
      checked: undefined,
      key: 'last-30-minutes',
      visibility: false
    }];

    beforeEach(() => {
      stub = sinon.stub(api.actions.fetchAnalyticsData, 'request');
    });

    afterEach(() => {
      stub.restore();
    });

    it('should fetch content report cards data', (done) => {
      const mockResponse = data.mockCRCards;

      // Create promise
      let deferred = Q.defer();

      // Resolve promise with mock response
      deferred.resolve(mockResponse);

      // Return promise from API
      stub.returns(deferred.promise);

      const expectedActions = [
        { type: types.CONTENT_REPORT_CARDS_REQUEST },
        { type: types.CONTENT_REPORT_CARDS_SUCCESS,
          headers: data.mockCRCardsTransformedMapped.headers,
           data: data.mockCRCardsTransformedMapped.data
        },
        { type: types.CONTENT_REPORT_FINAL_CARDS_FETCH } // TODO should be its own test
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(actions.getContentReportCards());
    });

    it('should fail fetching content report cards data', (done) => {
      const mockRejection = 'Could not find data';

      // Create promise
      let deferred = Q.defer();

      // Resolve promise with mock response
      deferred.reject(mockRejection);

      // Return promise from API
      stub.returns(deferred.promise);

      const expectedActions = [
        { type: types.CONTENT_REPORT_CARDS_REQUEST },
        { type: types.CONTENT_REPORT_CARDS_FAILURE, error: mockRejection }
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(actions.getContentReportCards());
    });
  });

  // Content report overview
  const overviewRequestActions = [{
    method: 'contentReportTopVideosRequest',
    type: types.CONTENT_REPORT_TOPVIDEOS_REQUEST
  }, {
    method: 'contentReportTopContentPartnersRequest',
    type: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_REQUEST
  }, {
    method: 'contentReportTopDistributorsRequest',
    type: types.CONTENT_REPORT_TOP_DISTRIBUTORS_REQUEST
  }, {
    method: 'contentReportTopContentSiteSectionsRequest',
    type: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_REQUEST
  }, {
    method: 'contentReportVideoViewsReferrerRequest',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_REQUEST
  }, {
    method: 'contentReportBarChartRequest',
    type: types.CONTENT_REPORT_ENGAGEMENT_REQUEST
  }, {
    method: 'contentReportVideoViewsCountryRequest',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_COUNTRY_REQUEST
  }, {
    method: 'contentReportVideoViewsDevicesRequest',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_DEVICES_REQUEST
  }, {
    method: 'contentReportSummaryRequest',
    type: types.CONTENT_REPORT_SUMMARY_REQUEST
  }, {
    method: 'contentReportSummaryProviderRequest',
    type: types.CONTENT_REPORT_SUMMARY_PROVIDER_REQUEST
  }, {
    method: 'contentReportViewsRequest',
    type: types.CONTENT_REPORT_VIEWS_REQUEST
  }];

  overviewRequestActions.forEach(requestTest => {
    describe(requestTest.method, () => {
      it('returns a request action', () => {
        const expectedAction = {
          type: requestTest.type,
        };
        expect(actions[requestTest.method]()).toEqual(expectedAction);
      });
    });
  });

  const overviewSuccess = [{
    method: 'contentReportVideoViewsCountrySuccess',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_COUNTRY_SUCCESS,
    response: data.mockCRVideoViewsCountry,
    transformedResponse: data.mockCRVideoViewsCountryTransformed
  }, {
    method: 'contentReportVideoViewsDevicesSuccess',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_DEVICES_SUCCESS,
    response: data.mockCRVideoViewsDevices,
    transformedResponse: data.mockCRVideoViewsDevicesTransformed
  }, {
    method: 'contentReportTopVideosSuccess',
    type: types.CONTENT_REPORT_TOPVIDEOS_SUCCESS,
    response: data.mockCRTopVideos,
    transformedResponse: data.mockCRTopVideosTransformed
  }];

  overviewSuccess.forEach(successTest => {
    describe(successTest.method, () => {
      it('returns a success action', () => {
        const response = successTest.response;
        const expectedAction = {
          type: successTest.type,
          data: successTest.transformedResponse,
        };
        expect(actions[successTest.method](response)).toEqual(expectedAction);
      });
    });
  });

  const overviewSuccessActionsAndHeaders = [{
    method: 'contentReportBarChartSuccess',
    type: types.CONTENT_REPORT_ENGAGEMENT_SUCCESS,
    response: data.mockCRVideoEngagement,
    transformedResponse: data.mockCRVideoEngagementTransformed
  }, {
    method: 'contentReportSummarySuccess',
    type: types.CONTENT_REPORT_SUMMARY_SUCCESS,
    response: data.mockCRSummaryDistributor,
    transformedResponse: data.mockCRSummaryDistributorTransformed
  }, {
    method: 'contentReportSummaryProviderSuccess',
    type: types.CONTENT_REPORT_SUMMARY_PROVIDER_SUCCESS,
    response: data.mockCRSummaryProvider,
    transformedResponse: data.mockCRSummaryProviderTransformed
  }];

  overviewSuccessActionsAndHeaders.forEach(successTest => {
    describe(successTest.method, () => {
      it('returns a success action', () => {
        const response = successTest.response;
        const expectedAction = {
          type: successTest.type,
          data: successTest.transformedResponse.data,
          headers: successTest.transformedResponse.headers,
        };
        expect(actions[successTest.method](response)).toEqual(expectedAction);
      });
    });
  });

  const overviewSuccessActionsAndDates = [{
    method: 'contentReportViewsSuccess',
    type: types.CONTENT_REPORT_VIEWS_SUCCESS,
    response: data.mockCRViews,
    transformedResponse: data.mockCRViewsTransformed
  }];

  overviewSuccessActionsAndDates.forEach(successTest => {
    describe(successTest.method, () => {
      it('returns a success action', () => {
        const response = successTest.response;
        const expectedAction = {
          type: successTest.type,
          data: successTest.transformedResponse.data,
          dates: successTest.transformedResponse.dates,
        };
        expect(actions[successTest.method](response)).toEqual(expectedAction);
      });
    });
  });

  const overviewSuccessActionsAndPrevious = [{
    method: 'contentReportTopContentPartnersSuccess',
    type: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_SUCCESS,
    currentResponse: data.mockCRTopContentPartnersCurrent,
    transformedResponse: data.mockCRTopContentPartnersTransformed
  }, {
    method: 'contentReportTopDistributorsSuccess',
    type: types.CONTENT_REPORT_TOP_DISTRIBUTORS_SUCCESS,
    currentResponse: data.mockCRTopDistributorsCurrent,
    transformedResponse: data.mockCRTopDistributorsTransformed
  }, {
    method: 'contentReportVideoViewsReferrerSuccess',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_SUCCESS,
    currentResponse: data.mockCRVideoViewsReferrerCurrent,
    transformedResponse: data.mockCRVideoViewsReferrerTransformed
  }, {
    method: 'contentReportTopContentSiteSectionsSuccess',
    type: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_SUCCESS,
    currentResponse: data.mockCRTopSiteSectionCurrent,
    transformedResponse: data.mockCRTopSiteSectionTransformed
  }];

  overviewSuccessActionsAndPrevious.forEach(successTest => {
    describe(successTest.method, () => {
      it('returns a success action', () => {
        const response = successTest.currentResponse;
        const expectedAction = {
          type: successTest.type,
          data: successTest.transformedResponse,
        };
        expect(actions[successTest.method](response)).toEqual(expectedAction);
      });
    });
  });

  const overviewFailureActions = [{
    method: 'contentReportTopVideosFailure',
    type: types.CONTENT_REPORT_TOPVIDEOS_FAILURE
  }, {
    method: 'contentReportTopContentPartnersFailure',
    type: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_FAILURE
  }, {
    method: 'contentReportTopDistributorsFailure',
    type: types.CONTENT_REPORT_TOP_DISTRIBUTORS_FAILURE
  }, {
    method: 'contentReportTopContentSiteSectionsFailure',
    type: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_FAILURE
  }, {
    method: 'contentReportVideoViewsReferrerFailure',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_FAILURE
  }, {
    method: 'contentReportBarChartFailure',
    type: types.CONTENT_REPORT_ENGAGEMENT_FAILURE
  }, {
    method: 'contentReportVideoViewsCountryFailure',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_COUNTRY_FAILURE
  }, {
    method: 'contentReportVideoViewsDevicesFailure',
    type: types.CONTENT_REPORT_VIDEO_VIEWS_DEVICES_FAILURE
  }, {
    method: 'contentReportSummaryFailure',
    type: types.CONTENT_REPORT_SUMMARY_FAILURE
  }, {
    method: 'contentReportSummaryProviderFailure',
    type: types.CONTENT_REPORT_SUMMARY_PROVIDER_FAILURE
  }, {
    method: 'contentReportViewsFailure',
    type: types.CONTENT_REPORT_VIEWS_FAILURE
  }];

  overviewFailureActions.forEach(requestTest => {
    describe(requestTest.method, () => {
      it('returns a failure action', () => {
        const mockError = 'Failed to fetch report';
        const expectedAction = {
          type: requestTest.type,
          error: mockError
        };
        expect(actions[requestTest.method](mockError)).toEqual(expectedAction);
      });
    });
  });

  const fetchContentReportWithPrevious = [{
    method: 'getContentReportTopContentPartners',
    api: 'fetchTopContentPartners',
    currentResponse: data.mockCRTopContentPartnersCurrent,
    transformedResponse: data.mockCRTopContentPartnersTransformed,
    requestType: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_REQUEST,
    successType: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_SUCCESS,
    failureType: types.CONTENT_REPORT_TOP_CONTENT_PARTNERS_FAILURE
  }, {
    method: 'getContentReportTopDistributors',
    api: 'fetchTopDistributors',
    currentResponse: data.mockCRTopDistributorsCurrent,
    transformedResponse: data.mockCRTopDistributorsTransformed,
    requestType: types.CONTENT_REPORT_TOP_DISTRIBUTORS_REQUEST,
    successType: types.CONTENT_REPORT_TOP_DISTRIBUTORS_SUCCESS,
    failureType: types.CONTENT_REPORT_TOP_DISTRIBUTORS_FAILURE
  }, {
    method: 'getContentReportVideoViewsReferrer',
    api: 'fetchVideoViewsReferrer',
    currentResponse: data.mockCRVideoViewsReferrerCurrent,
    transformedResponse: data.mockCRVideoViewsReferrerTransformed,
    requestType: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_REQUEST,
    successType: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_SUCCESS,
    failureType: types.CONTENT_REPORT_VIDEO_VIEWS_REFERRER_FAILURE
  }, {
    method: 'getContentReportTopContentSiteSections',
    api: 'fetchTopContentSiteSections',
    currentResponse: data.mockCRTopSiteSectionCurrent,
    transformedResponse: data.mockCRTopSiteSectionTransformed,
    requestType: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_REQUEST,
    successType: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_SUCCESS,
    failureType: types.CONTENT_REPORT_TOP_CONTENT_SITE_SECTIONS_FAILURE
  }];

  fetchContentReportWithPrevious.forEach(fetchTest => {
    describe(fetchTest.method, () => {
      const currentFilters = [{
        name: 'datetime',
        type: 'date_range',
        displayName: 'Last Week',
        startOf: 'week',
        value: {
          week: 1
        },
        key: 'last-week',
        visibility: false
      }];
      const previousFilters = [{
        name: 'datetime',
        type: 'date_range',
        value: {
          week: 2
        },
        startOf: 'week',
        displayName: 'Last To Last Week',
        optionName: 'Last To Last Week',
        key: 'last-to-last-week',
        visibility: false
      }];
      let stub;

      beforeEach(() => {
        // Mock localStorage
        global.localStorage = {
          getItem: (item) => item
        };
        stub = sinon.stub(api.actions[fetchTest.api], 'request');
      });

      afterEach(() => {
        stub.restore();
      });

      it('returns a promise array with current and previous responses', (done) => {
        const mockCurrentReponse = fetchTest.currentResponse;
        const mockPreviousResponse = fetchTest.previousResponse;

        // Create promise
        let deferredCurrent = Q.defer();
        let deferredPrevious = Q.defer();

        // Resolve promise with mock response
        deferredCurrent.resolve(mockCurrentReponse);
        deferredPrevious.resolve(mockPreviousResponse);

        // Return promise from API once on first call
        stub.onCall(0).returns(deferredCurrent.promise);
        stub.onCall(1).returns(deferredPrevious.promise);

        const expectedActions = [
          { type: fetchTest.requestType },
          { type: fetchTest.successType,
            data: fetchTest.transformedResponse
          }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(actions[fetchTest.method](currentFilters, previousFilters));
      });

      it('returns a rejected promise array', (done) => {
        const mockRejection = 'Could not find data';

        // Create promise
        let deferred = Q.defer();

        // Resolve promise with mock response
        deferred.reject(mockRejection);

        // Return promise from API
        stub.onCall(0).returns(deferred.promise);

        const expectedActions = [
          { type: fetchTest.requestType },
          { type: fetchTest.failureType, error: mockRejection }
        ];
        const store = mockStore({}, expectedActions, done);
        store.dispatch(actions[fetchTest.method](currentFilters, previousFilters));
      });
    });
  });

});
