import * as actions from '../categoriesActions'

describe('categoriesAction', () => {
  it('selectCategory: создаем событие выбора категории', () => {
    const categoryId = '12321';
    const expectedAction = {
      type: 'SELECT_CATEGORY',
      categoryId
    };
    expect(actions.selectCategory(categoryId)).toEqual(expectedAction)
  });
  it('clearStateCategoryList: очищаем состояние выбранных категорий', () => {
    const expectedAction = {
      type: 'CLEAR_CATEGORY_STATE'
    };
    expect(actions.clearStateCategoryList()).toEqual(expectedAction)
  });
});

