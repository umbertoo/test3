import reducer from '../commonPages';

const initState = {
  isLoading: false,
  pagesWithCity: {},
  pagesWithoutCity: {},
};

describe('commonPages reducer', () => {
  it('Должен заполнить начальное состояние', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initState)
  });

  it('Смена состояния при начале запроса страниц', () => {
    expect(
      reducer(initState, {
        type: 'FETCH_COMMON_PAGE_REQUEST'
      })
    ).toEqual({
      ...initState,
      isFetching: true,
      error: null,
    })
  });

  it('Ошибка при запросе', () => {
    expect(
      reducer(initState, {
        type: 'FETCH_COMMON_PAGE_FAILURE'
      })
    ).toEqual({
      ...initState,
      isFetching: false,
      error: 'Не удалось получить данные',
    })
  });


  describe('Успешно отработанный запрос', () => {
    describe('если ЕСТЬ cityUrl в action, складываем полученые страницы в pagesWithCity',()=>{

      const action = {
        type: 'FETCH_COMMON_PAGE_SUCCESS',
        $props: {
          cityUrl: 'moscow',
          pageUrl: 'page',
        },
        data:{pagename:'page'},
      };
      const {$props:{cityUrl, pageUrl}, data} = action;

      it('добавление в пустой список', () => {

        expect(reducer(initState, action)).toEqual({
          ...initState,
          pagesWithCity: {
            ...initState.pagesWithCity,
            [cityUrl]: {
              ...initState.pagesWithCity[cityUrl],
              [pageUrl]: data,
            },
          },
          isFetching: false,
        })
      });
      it('добавление в НЕ пустой список', () => {
        const state ={
          ...initState,
          pagesWithCity:{
            'kogalim':{
              'some_page':{pagename:'some_page'}
            }
          }
        }

        expect(reducer(state, action)).toEqual({
          ...state,
          pagesWithCity: {
            ...state.pagesWithCity,
            [cityUrl]: {
              ...state.pagesWithCity[cityUrl],
              [pageUrl]: data,
            },
          },
          isFetching: false,
        })
      });

      it('заменяет на новую, если пришла уже скачанная страница', () => {
        const stateWithPage ={
          ...initState,
          pagesWithCity:{
            [cityUrl]: {
              [pageUrl]: data,
            },
          }
        }
        expect(reducer(stateWithPage, action)).toEqual({
          ...stateWithPage,
          isFetching: false,
        })
      });
      it('добавляет страницу в свой город', () => {
        const stateWithCity ={
          ...initState,
          pagesWithCity:{
            [cityUrl]: {},
          }
        }
        expect(reducer(initState, action)).toEqual({
          ...initState,
          pagesWithCity:{
            [cityUrl]: {
              [pageUrl]: data,
            },
          },

          isFetching: false,
        })
      });
    });

    describe('если НЕТ cityUrl в action, складываем полученые страницы в pagesWithoutCity',()=>{
      const actionWithoutCityUrl = {
        type: 'FETCH_COMMON_PAGE_SUCCESS',
        $props: {
          cityUrl: null,
          pageUrl: 'page',
        },
        data:{pagename:'page'},
      };

      const {$props:{pageUrl},data} = actionWithoutCityUrl;

      it('в пустой список', () => {
        expect(reducer(initState, actionWithoutCityUrl)).toEqual({
          ...initState,
          pagesWithoutCity: {
            ...initState.pagesWithoutCity,
            [pageUrl]: data,
          },
          isFetching: false,
        })
      });

      it('в НЕ пустой список', () => {
        const stateWithPage ={
          ...initState,
          pagesWithoutCity:{
            'some_page':{pagename:'some_page'}
          }
        }

        expect(reducer(stateWithPage, actionWithoutCityUrl)).toEqual({
          ...stateWithPage,
          pagesWithoutCity: {
            ...stateWithPage.pagesWithoutCity,
            [pageUrl]: data,
          },
          isFetching: false,
        })
      });

      it('заменяет на новую, если пришла уже скачанная страница', () => {
        const stateWithPage = {
          ...initState,
          pagesWithoutCity:{
            [pageUrl]:data
          }
        }
        expect(reducer(stateWithPage, actionWithoutCityUrl)).toEqual({
          ...stateWithPage,
          isFetching: false,
        })
      });
    });
  })
});
