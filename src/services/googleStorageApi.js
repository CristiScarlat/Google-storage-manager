import { request } from './axiosInstance';

async function listBucketsByProject() {
    return await request('get', '/b');
}

async function listFilesInBucket(bucket) {
    return await request('get', `/b/${bucket}/o`);
}

async function downloadMediaLink(mediaUrl){
    const newMediaLink = mediaUrl.slice(mediaUrl.indexOf('v1') + 2)
    return await request('get', newMediaLink)
}


export { listBucketsByProject, listFilesInBucket, downloadMediaLink }