const XHR = ( opts = {} ) => {
    //设置默认值
    let type = ( opts.type || 'GET' ).toLowerCase(),
        async = opts.async || true, //是否异步
        success = opts.success,
        error = opts.error,
        dataType = opts.dataType || 'json', //响应数据类型
        data = opts.data || {},
        params = formatParams( data );
    const host = "http://localhost:3001";
    const url = host + opts.url;
    //创建xhr对象，判断浏览器是否支持XMLHttpRequest
    let xhr;
//XMLHttpRequest发送请求时需要设置withCredentials属性为true,来允许浏览器在自己的域设置cookie值。
//如果withCredentials没有设置为true，就会出现Response Headers有Set-Cookie，但是浏览器却没有存储cookie的情况。
   
    window.XMLHttpRequest ?
        xhr = new XMLHttpRequest() :
        xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
        xhr.withCredentials=true;
    switch ( type ) {
        case 'get':
            xhr.open( 'get', url + "?" + params, async );
            xhr.send( null );
            break;
        case 'post':
            xhr.open( 'post', url, async );
            xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ); // 设置请求头
            xhr.send( params );
            break;
    }
    //响应请求
    xhr.onreadystatechange = function () {
        if ( xhr.readyState === 4 ) {
            if ( !/^2\d{2}$/.test( xhr.status ) ) {
                error && error( xhr.status );
            } else {
                dataType === 'json'
                    ? success && success( JSON.parse( xhr.responseText ) )
                    : success( xhr.responseText );
            }
        }
    }
}
//格式化参数 以username=admin&password=123的形式返回
const formatParams = function ( data ) {
    //设置时间戳,避免缓存
    data.atTime = new Date().getTime();
    let arr = [];
    for ( let key in data ) {
        arr.push( key + '=' + data[ key ] );
    }
    return arr.join( '&' );
}

export default XHR;

