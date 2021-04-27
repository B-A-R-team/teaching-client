/**
 * 获取个人参与的活动，包括预发布和参加过的
 */
import { request } from '../utils';

export async function fetchPerActive(user_id, room_id, advance = 0) {
  const res = await request({
    url: '/active/perActive',
    method: 'get',
    params: {
      user_id,
      room_id,
      advance
    },
  });
  let arr = []
  if (res.code === 200) {
    res.data.forEach(item => {
      const obj = {}
      obj.active_id = item.id
      obj.content = item.content
      obj.title = item.title
      obj.action = `教研室 ${item.room_id}`
      arr.push(obj)
    })
  }
  return Promise.resolve(arr);
}
export async function returnAgreeActive(user_id, active_id, is_agree) {
  return await request({
    url: '/active/agreeActive',
    method: 'PUT',
    data: {
      user_id,
      active_id,
      is_agree
    },
  });
}