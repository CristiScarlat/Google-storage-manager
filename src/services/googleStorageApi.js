import { request } from './axiosInstance';

async function listBucketsByProject() {
    return await request('get', '/storage/v1/b', {});
}

async function listFilesInBucket(bucket) {
    return await request('get', `/storage/v1/b/${bucket}/o`, {});
}

async function downloadMediaLink(bucket, filename){
    return await request('get', `storage/v1/b/${bucket}/o/${filename}?alt=media`, {})
}

async function uploadFile(bucket, filepath, filename){
    return await request('post', `/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${filepath}`, {'Content-Type': 'image/jpeg'})
}



export { listBucketsByProject, listFilesInBucket, downloadMediaLink, uploadFile }