//时间戳格式化为日期
import moment from 'moment';
const formatTime = (time) => {
    return moment(Number(time)).format("YYYY/MM/DD HH:mm:ss");
}
export default formatTime;