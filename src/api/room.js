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

export function fetchEditRoom({ id, name, director_id, f_director_id }) {
  return request({
    url: '/room/updateRoom',
    method: 'put',
    data: { id, name, director_id, f_director_id },
  });
}

export function fetchRoomById(room_id) {
  return request({
    url: '/room/info',
    method: 'get',
    params: {
      room_id,
    },
  });
}

export function fetchCreateRoom(name) {
  return request({
    url: '/room/createRoom',
    method: 'post',
    data: { name },
  });
}

export function fetchAddUser(room_id, user_id) {
  return request({
    url: '/room/addUser',
    method: 'post',
    data: {
      id: user_id,
      room_id,
    },
  });
}

export function fetchDeleteUser(room_id, user_id) {
  return request({
    url: '/room/deleteUser',
    method: 'post',
    data: {
      user_id,
      room_id,
    },
  });
}
