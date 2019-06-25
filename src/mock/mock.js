import request from '@/utils/request'
import MockAdapter from 'axios-mock-adapter';
import {
  menu,
  list,
  keys
} from './data/optometrist'; // 导入数据
export default {
  // 初始化函数
  start() {
    // 创建 MockAdapter 实例
    let mock = new MockAdapter(request);
    mock.onPost('/getlist').reply(config => {

      return [200, list];
    });
    mock.onPost('/getkey').reply(config => {

      return [200, keys];
    });

    mock.onPost('/getmenu').reply(config => {

      return [200, menu];
    });
  }
};
