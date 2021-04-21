import { request } from '../utils';

/**
 * 按照开始时间已发布获取活动
 * @returns Promise
 */
export async function fetchActiveListByType(type) {
  const res = await request({
    url: '/active/getActives',
    method: 'get',
    params: {
      type
    },
  });
  let arr = []
  if (res.code === 200) {
    res.data.forEach(item => {
      const obj = {}
      obj.avatar = item.leader.avatar
      obj.action = item.room.name
      obj.title = item.title
      obj.subtitle = `<span class="text--primary">${item.leader.name}</span> &mdash; ${item.content}.`
      arr.push(obj)
      arr.push({ divider: true, inset: true })
    })
  }
  return Promise.resolve(arr);
}