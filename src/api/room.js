import { request } from '../utils';

export function fetchRoomList(page = 0, pageSize = 10) {
  return request({
    url: '/room/getAll',
    method: 'get',
    params: {
      startNum: page * pageSize,
      pageSize,
    },
  });
}
