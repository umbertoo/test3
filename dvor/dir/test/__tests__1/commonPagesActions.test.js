import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMiddleware } from 'redux-fetch-middleware';
import nock from 'nock';
import {fetchCommonPage} from '../commonPagesActions';

const createMockStore = configureMockStore([ thunk, fetchMiddleware ]);

describe('Async Actions', () => {
  const env = process.env;
  const testServerUrl='https://www.sdvor.com/api/v1'

  before(()=>{
    process.env = { API_URL_SDVOR: testServerUrl };
  });
  after(() =>{
    process.env = env;
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('должен быть диспатч FETCH_COMMON_PAGE_SUCCESS на ответе', (done) => {

    const pageUrl = 'pageName';
    const cityUrl = 'cityName';
    const url =  `${testServerUrl}/pages/${pageUrl}/?city_id__uri_name=${cityUrl}` ;
    nock(testServerUrl)
    .get(`/pages/${pageUrl}/` )
    .reply(200, { data: 'OK!' });

    const expectedActions = [
      {
        type: 'FETCH_COMMON_PAGE_REQUEST',
        $props: {
          pageUrl,
          cityUrl,
        },
        $payload:{url}
      },
      { type: 'FETCH_COMMON_PAGE_SUCCESS', payload: { payload: 'OK!' }, meta: undefined }
    ];

    const store = createMockStore({ payload: 'OK!' }, expectedActions, done);
    store.dispatch(fetchCommonPage());
  });
});
