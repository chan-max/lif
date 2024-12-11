
import COS from 'cos-js-sdk-v5';
import { useConfigStore } from '../store/config';

var _cos: any
export const getCOS = () => {

    let configStore = useConfigStore()


    if (_cos) {
        return _cos
    }

    _cos = new COS({
        SecretId: configStore.cos.SecretId,
        SecretKey: configStore.cos.SecretKey,
        Bucket: configStore.cos.Bucket,
        Region: configStore.cos.Region,
    } as any)

    return _cos
}


export async function uploadToCOS({
    file,
    key = new Date().getTime() + '_1s_' + file.name,
}) {
    const cos = getCOS();
    try {
        const res = await cos.uploadFile({
            Key: String(key),
            Body: file,
            Bucket: cos.options.Bucket,
            Region: cos.options.Region
        })
        return {
            url: `https://${res.Location}`,
            key
        }
    } catch (e) {
        throw e
    }
}


export function deleteCOSFile(key) {

    if (key.startsWith('http')) {
        // 如果是链接则会
        key = key.substring(key.lastIndexOf('/') + 1);
    }

    return new Promise((resolve, reject) => {
        const cos = getCOS();

        key = String(key)
        cos.deleteObject({
            Bucket: cos.options.Bucket,
            Region: cos.options.Region,
            Key: key
        }, function (err, data) {
            if (err) {
                console.error('删除文件失败:', err);
                reject(err);
            } else {
                console.log('删除文件成功:', data);
                resolve(data);
            }
        });
    });
}




