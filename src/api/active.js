import { request } from '../utils';

export function fetchActiveList(type) {
  return async () =>
    await request({
      url: '/active/getActives',
      method: 'get',
      params: {
        type,
      },
    });
}

/**
 * 获取正在进行的活动
 */
export const fetchActiveListWhenDoing = fetchActiveList('doing');
/**
 * 获取已经完成的活动
 */
export const fetchActiveListWhenDone = fetchActiveList('done');
/**
 * 获取未开始活动
 */
export const fetchActiveListWillDo = fetchActiveList('will');
/**
 * 同时获取进行中以及未开始的活动
 */
export function fetchActiveListBothDoingAndWillDo() {
  return Promise.all([fetchActiveListWhenDoing(), fetchActiveListWillDo()]);
}

/**
 * 按照开始时间已发布获取活动
 * @returns Promise
 */
export async function fetchActiveListByType(type) {
  const res = await fetchActiveList(type)();
  let arr = [];
  if (res.code === 200) {
    res.data.forEach((item) => {
      const obj = {};
      obj.avatar = item.leader.avatar;
      obj.action = item.room.name;
      obj.title = item.title;
      obj.subtitle = `<span class="text--primary">${item.leader.name}</span> &mdash; ${item.content}.`;
      arr.push(obj);
      arr.push({ divider: true, inset: true });
    });
  }
  return Promise.resolve(arr);
}

/**
 * 获取活动列表
 * @param {Number} advance 活动状态
 * @returns 获取两种状态的请求
 */
export function fetchActive(advance) {
  return async (userId, roomId) =>
    await request({
      url: '/active/perActive',
      method: 'get',
      params: {
        advance,
        user_id: userId,
        room_id: roomId,
      },
    });
}
/**
 * 获取预发布的活动
 * @param {Number} userId 用户ID
 * @param {Number} roomId 教研室ID
 */
export const fetchPrePublishedActive = fetchActive(0);
/**
 * 获取已发布的活动
 * @param {Number} userId 用户ID
 * @param {Number} roomId 教研室ID
 */
export const fetchPublishedActive = fetchActive(1);

/**
 * 并发请求已发布和未发布的活动
 * @param {Number} userId 用户ID
 * @param {Number} roomId 教研室ID
 * @returns
 */
export function fetchActiveWithConcurrent(userId, roomId) {
  return Promise.all([
    fetchPublishedActive(userId, roomId),
    fetchPrePublishedActive(userId, roomId),
  ]);
}

export const fetchActiveDetail = (id) =>
  request.get('/active/getActiveById', {
    params: {
      type: 'act',
      id,
    },
  });
