//请求错误/成功通知处理
import { notification } from 'antd';
const notice = (res) => {
    setTimeout(() => {
        window.location.reload();
    }, 3000)
    notification.success({
        message: res.msg,
        duration: 2
    })
}
export default notice;

