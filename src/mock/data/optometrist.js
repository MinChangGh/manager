import Mock from 'mockjs'; // 导入mockjs 模块
let menu = {data: []};
let edit = {data: []};
let list = {data: [[], [], []]};
// let keys= {data: [[], [], []]}
// for (let i=0; i<3;i++) {
//   keys.data[i].push()
// }
let keys = {
  data: [[{
    0: '姓名1',
    1: 'name'
  },
    {
      0: '标题1',
      1: 'title'
    },
    {
      0: '描述1',
      1: 'tip'
    },
    {
      0: '时间1',
      1: 'tp'
    }],
    [
      {
        0: '姓名2',
        1: 'name'
      },
      {
        0: '标题2',
        1: 'title'
      },
      {
        0: '描述2',
        1: 'tip'
      },
      {
        0: '时间2',
        1: 'tp'
      }
    ],
    [
      {
        0: '姓名3',
        1: 'name'
      },
      {
        0: '标题3',
        1: 'title'
      },
      {
        0: '描述3',
        1: 'tip'
      },
      {
        0: '时间3',
        1: 'tp'
      }]

  ]
};

for (let i = 1; i <= 5; i++) {
  menu.data.push(Mock.mock({ // 根据数据模板生成模拟数据。
    name: `menu${i}`,
    sonlist: [
      {
        name: Mock.Random.province().substring(0, 3),
        id: '1'
      },
      {
        name: Mock.Random.province().substring(0, 3),
        id: '2'
      },
      {
        name: Mock.Random.province().substring(0, 3),
        id: '3'
      }
    ]
  }));
}

for (let k = 0; k < 3; k++) {
  for (let i = 1; i <= 10; i++) {
    list.data[k].push(Mock.mock({ // 根据数据模板生成模拟数据。
      name: Mock.Random.date() + 'id=' + (k + 1),
      title: Mock.Random.first() + 'id=' + (k + 1),
      tip: Mock.Random.color() + 'id=' + (k + 1),
      tp: Mock.Random.rgb() + 'id=' + (k + 1),
      operator: [
        {
          type: 'del'
        },
        {
          type: 'edit'
        }
      ]
    }));
  }
}

export {
  menu,
  list,
  keys
};
