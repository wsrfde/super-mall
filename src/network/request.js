import axios from 'axios'

// export function request(config) {
//   const instance1 = axios.create({
//     baseURL:'接口',
//     timeout:500
//   });
//
//   return instance1(config);
// }

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance1 = axios.create({
      baseURL:'接口',
      timeout:500
    });
    const instance2 = axios.create({
      baseURL:'接口',
      timeout:5000
    });

    instance1.interceptors.response.use(res => {
      return res.data
    })

    instance2.interceptors.response.use(res => {
      return res.data
    })


    instance1(config).
    then( res => {
      resolve(res)
    }).catch(err =>{
      console.log('接口1获取失败，'+ err);
      console.log('正在切换接口2');
      instance2(config)
        .then( res => {
          console.log('接口2切换成功');
          resolve(res);
        }).catch(err =>{
        console.log('接口2切换失败,请稍后重试，错误信息：' + err);
        })
    })
  })
}
