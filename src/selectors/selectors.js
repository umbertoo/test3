import moment from 'moment';
import memoize from 'lodash/memoize';
import reduce from 'lodash/reduce';

export const DIVIDER_TIME= 'DIVIDER_TIME';

export const getMessagesWidthDeviders = memoize((messages)=>{
  let prevDate;
  let prevUserId;
  const now = moment();
  return reduce(messages,(list, message)=>{
      const currentDate = moment(message.createdAt);
      //ADD DIVIDER_TIME
      if(prevDate && !currentDate.isSame(prevDate,'days')){
        const nowDiff = now.diff(prevDate, 'days');
        if(nowDiff>1){
          list.push({ type:DIVIDER_TIME, content:prevDate.format("D MMMM YYYY") });
        }
        if(nowDiff==1){
          list.push({ type:DIVIDER_TIME, content:"вчера" });
        }
      }
      //CHECK MINIMAIZED
      const minimaized = prevUserId == message.userId && currentDate.diff(prevDate, 'm') < 2;

      //ADD MESSAGE
      list.push(minimaized ? {...message, minimaized} : message);

      prevUserId = message.userId;
      prevDate = currentDate;
      return list;
  },[]);
});
