import { request } from '../utils';

// 获取首页活动列表
export function fetchActiveList({ type, current_page, page_size }) {
  return async () =>
    await request({
      url: '/active/getActives',
      method: 'get',
      params: {
        type,
        current_page,
        page_size,
      },
    });
}

/**
 * 获取已经完成的活动
 */
export const fetchActiveListWhenDone = ({ page_size, current_page }) =>
  fetchActiveList({ type: 'done', page_size, current_page });
/**
 * 获取未开始活动
 */
export const fetchActiveListWillDo = ({ page_size, current_page }) =>
  fetchActiveList({ type: 'will', page_size, current_page });
/**
 * 同时获取进行中以及未开始的活动
 */
export function fetchActiveListBothDoingAndWillDo({ page_size, current_page }) {
  return Promise.all([
    fetchActiveListWhenDone({ page_size, current_page })(),
    fetchActiveListWillDo({ page_size, current_page })(),
  ]);
}

export const fetchAllActiveList = ({ current_page, page_size }) => {
  return Promise.all([
    fetchActiveListByType({ type: 'will', current_page, page_size }),
    fetchActiveListByType({ type: 'done', current_page, page_size }),
  ]);
};

/**
 * 按照开始时间已发布获取活动
 * @returns Promise
 */
export async function fetchActiveListByType({ type, current_page, page_size }) {
  const res = await fetchActiveList({ type, current_page, page_size })();
  // console.log(res)
  let arr = [];
  if (res.code === 200) {
    res.data.act.forEach((item) => {
      const obj = {};
      obj.id = item.id;
      obj.avatar = item.leader.avatar;
      obj.action = item.start_time.substring(0,10) +`\xa0\xa0|\xa0\xa0`+ item.room.name;
      obj.title = item.title;
      obj.subtitle = `<span class="text--primary">${item.leader.name}</span> &mdash; ${item.content}.`;
      arr.push(obj);
      arr.push({ divider: true, inset: true });
    });
  }
  res.data.act = arr;
  return Promise.resolve(res);
}

/**
 * 获取活动列表
 * @param {Number} type 活动状态
 * @returns 获取两种状态的请求
 */
export function fetchActive(type) {
  return async (userId, roomId, { current_page, page_size }) =>
    await request({
      url: '/active/perActive',
      method: 'get',
      params: {
        type,
        user_id: userId,
        room_id: roomId,
        current_page,
        page_size,
      },
    });
}
/**
 * @param {Number} userId 用户ID
 * @param {Number} roomId 教研室ID
 */
export const fetchDoneActive = fetchActive('done');
/**
 * 获取已发布的活动
 * @param {Number} userId 用户ID
 * @param {Number} roomId 教研室ID
 */
export const fetchWillActive = fetchActive('will');

// 获取活动详情
export const fetchActiveDetail = (id) =>
  request.get('/active/getActiveById', {
    params: {
      type: 'act',
      id,
    },
  });

// 获取评论
export const fetchCommentsByActiveId = (id) =>
  request('/commit/getAllByActive', {
    params: {
      id,
    },
  });

//添加评论
export const fetchAddComment = ({ user_id, active_id, content }) =>
  request.post('/commit/createCommit', {
    user_id,
    active_id,
    content,
  });

// 添加文件
export const fetchAddRecordFile = (formData) =>
  request({
    url: '/upload/record',
    method: 'post',
    data: formData,
  });

export function fetchActiveListToday(timestamp) {
  return request({
    url: '/active/getActivesByTime',
    method: 'get',
    params: {
      time: timestamp,
    },
  });
}

// 预发布活动
export const fetchAdvancePublish = (data) =>
  request({
    url: '/active/createActive',
    method: 'post',
    data,
  });

// 获取活动发起者的预发布活动
export const fetchAdvActivesByLeader = () =>
  request({
    url: '/active/advance',
    method: 'get',
  });

// 评审活动
export const fetchAgress = (data) =>
  request({
    url: '/active/agreeActive',
    method: 'put',
    data,
  });

// 发布预发布的活动
export const fetchPublishAdvance = (id) =>
  request({
    url: '/active/issueAdvance',
    method: 'post',
    data: {
      id,
    },
  });

// 更新活动内容
export const fetchUpdateActive = (data) =>
  request({
    url: '/active/updateActiveById',
    method: 'put',
    data,
  });

export function fetchActiveByRoomId(id) {
  return request({
    url: '/active/getActiveById',
    method: 'get',
    params: {
      type: 'room',
      id,
    },
  });
}
