
const url;

export default async (url = "" , data = {} , type = "get" , method = "fetch" ) => {
    type = type.toUpperCase()
    url = baseUrl + url;

    if( type == "GET" ){
        let dataStr = "";  //数据的字符串拼接
        Object.keys(data).forEach(key => {
            dataStr += key + data[key]+'&'
        })
        if( dataStr !== '' ){
            dataStr = dataStr.substring(0,dataStr.length-1)
            url = url + '?' + dataStr
        }
    }

    if(window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method : type,
            headers : {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'force-cache'
        }

        if(type =="POST"){
            Object.defineProperty(requestConfig,'body',{
                value :JSON.stringify(data)
            })
        }

        try {
            const response  = await fetch(url , requestConfig);
            const responseJson  = await response.json() ;
            return responseJson
        }catch( error ){
            throw new Error(error)
        }
    }else{
        return new Promise(
            ( resolve, reject ) => {
                let requestObj;
                if(window.XMLHttpRequest){
                    requestObj = new XMLHttpRequest()
                }else{
                    requestObj = new ActiveXObject;
                }

                let sendData = "";
                if( type == "POST" ){
                    sendData = JSON.stringify( data );
                }

                requestObj.open(type, url, true);
                requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                requestObj.send(sendData);

                requestObj.onreadystatechange= () => {
                    if(xhr.readyState ==4){
                        let obj = requestObj.response
                        if(typeof obj !== 'object'){
                            obj = JSON.parse(obj)
                        }
                        resolve(obj)
                    }else{
                        reject( requestObj )
                    }
                }
            }
        )
    }
}