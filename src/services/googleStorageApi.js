import { request } from './axiosInstance';

async function listBucketsByProject() {
    return await request('get', '');
}



export { listBucketsByProject }