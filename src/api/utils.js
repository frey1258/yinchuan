import request from '@/utils/request';
import { getToken } from '@/utils/auth'

export function uploadFileToFast(params) {
    // 上传文件
    return request({
        url: '/file/uploadFileToFast',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken()
        },
        data: params,
    })
}