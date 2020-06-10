import { authRequest } from '@/utils/request'

export function getNotifications() {
  return authRequest('notifications')
}

export function readNotifications() {
  return authRequest('user/read/notifications', {
    method: 'PUT'
  })
}
