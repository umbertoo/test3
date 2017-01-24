import React from 'react';
import { Route, IndexRoute } from 'react-router';
import PageServiceMenuContainer from './containers/PageServiceMenuContainer';
import PageCommonPageContainer from './containers/PageCommonPageContainer';
import PageCategoryContainer from './containers/PageCategoryContainer';
import PageProductContainer from './containers/PageProductContainer';
import PageContactsContainer from './containers/PageContactsContainer';
import PageSearchContainer from './containers/PageSearchContainer';
import PageCartContainer from './containers/PageCartContainer';


export const Routes = (
  <div>
    <Route path='/'>
      <IndexRoute component={PageServiceMenuContainer} />
      <Route path='/cart/' component={PageCartContainer}/>
      <Route path=':pageUrl' component={PageCommonPageContainer}/>
      <Route path=':cityUrl/contacts/' component={PageContactsContainer}/>
      <Route path=':cityUrl/catalog/search/' component={PageSearchContainer}/>
      <Route path=':cityUrl/catalog/*' component={PageCategoryContainer}/>
      <Route path=':cityUrl/product/:productUri/' component={PageProductContainer}/>
      <Route path=':cityUrl/:pageUrl/' component={PageCommonPageContainer}/>
    </Route>
    <Route path='*' component={PageServiceMenuContainer} />
  </div>
);
