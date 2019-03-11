import { call, put ,take,takeEvery,select} from 'redux-saga/effects'
import { uploadFiles,uploadFailure ,uploadSuccess,uploadProgress} from '../_actions/upload'
import { buffers, eventChannel, END } from 'redux-saga';
import { FILEUPLOAD} from '../_constants/api';

export function* uploadStart({ payload: {afterCall} }) {
    const { upload: { files } } = yield select()

    for (var file of files) {
        yield call(uploadFileSaga, file.file,file.folder,file.Index,file.field);
    }

    yield afterCall();
}

// Upload the specified file
function* uploadFileSaga(file,folder,Index,field) {
    const channel = yield call(createUploadFileChannel, FILEUPLOAD(folder), file);
    while (true) {
        const { progress = 0, err, success,response } = yield take(channel);
        if (err) {
            yield put(uploadFailure(file, err));
            return;
        }
        if (success) {
            yield put(uploadSuccess({Index,url:response.filename,field}));
            return;
        }
        yield put(uploadProgress({progress, Index}));
    }
}

function createUploadFileChannel(endpoint, file) {
    var formdata  = new FormData();
    formdata.append("file", file);

    return eventChannel(emitter => {
        const xhr = new XMLHttpRequest();
        const onProgress = (e) => {
            if (e.lengthComputable) {
                const progress = e.loaded / e.total * 100;
                emitter({ progress });
            }
        };
        const onFailure = (e) => {
            emitter({ err: new Error('Upload failed') });
            emitter(END);
        };
        xhr.upload.addEventListener("progress", onProgress);
        xhr.upload.addEventListener("error", onFailure);
        xhr.upload.addEventListener("abort", onFailure);
        xhr.onreadystatechange = () => {
            const { readyState, status,response } = xhr;
            
            if (readyState === 4) {
                if (status === 200) {
                    emitter({ success: true,response:JSON.parse(response) });
                    emitter(END);
                }
                else {
                    onFailure(null);
                }
            }
        };
        xhr.open("POST", endpoint, true);
        xhr.send(formdata);
        return () => {
            xhr.upload.removeEventListener("progress", onProgress);
            xhr.upload.removeEventListener("error", onFailure);
            xhr.upload.removeEventListener("abort", onFailure);
            xhr.onreadystatechange = null;
            xhr.abort();
        };
    }, buffers.sliding(2));
}