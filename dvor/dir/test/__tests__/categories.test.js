import categories from '../categories';

const initialState = {
    list: [],
    parentCategory: null,
    isFetching: false,
    fetched: false
}

describe('Редьюсер категории', () => {
    it('Должен заполнить начальное состояние', () => {
        expect(
            categories(undefined, {})
        ).toEqual(initialState)
    });

    it('Смена состояния при начале запроса', () => {
        expect(
            categories(initialState, {
                type: 'FETCH_CATEGORY_LIST_REQUEST'
            })
        ).toEqual({
            ...initialState,
            isFetching: true,
            fetched: false,
            error: null
        })
    });

    it("Успешно отработанный запрос", () => {
        expect(
            categories(initialState, {
                type: 'FETCH_CATEGORY_LIST_SUCCESS',
                data: { menudata: ['Пункт1', 'Пункт2'] }
            })
        ).toEqual({
            ...initialState,
            list: ['Пункт1', 'Пункт2'],
            isFetching: false,
            fetched: true
        });
    });

    it("Ошибка при запросе", () => {
        expect(
            categories(initialState, {
                type: 'FETCH_CATEGORY_LIST_FAILURE',
            })
        ).toEqual({
            ...initialState,
            isFetching: false,
            fetched: false,
        });
    });


});