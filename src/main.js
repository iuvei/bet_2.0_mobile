// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router';
// 引入全部UI组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

/***********************引用vuex 和http请求插件vue-resource***********************************************/


import vuex from 'vuex';
import VueResource from 'vue-resource';/*引入资源请求插件*/
Vue.use(vuex);
Vue.use(VueResource);
//请求地址
Vue.prototype.api = `http://lty-main.com`;  //母盘
//  Vue.prototype.api = `http://lty-sub.com`;  //子盘
//   Vue.prototype.api = ``;



//vue-resource的请求头
//拦截器，vue的每个request（ajax）都会过这个函数
Vue.http.interceptors.push(function (request, next) {
  //拦截器
  // 跨域携带cookie
  //request.credentials = true;
  request.headers.set('Authorization', 'bearer ' + window.sessionStorage.token);
  next();
});
Vue.http.options.emulateJSON = true;//vue-resource的处理方案
//vuex的使用
var store = new vuex.Store(
  {//store对象
    state:
    {
        isLogin: window.sessionStorage.isLogin == 'ok' ? true : false,
        nickname: '加载中',
        cash_money: 0,         //余额
        unclear: [],//未结算清单  用于侧边栏
        win_lost_today: 0,//今日盈亏
        return_present: 0,//今日返水
        isShowSecond: false,//是否显示每个彩种下面的第二级view
        son_off: false,//是否开启子盘 false,不开启，true，开启子盘;
        isShowUnclear: false,//是否显示右侧的未结算历史（近期下注）
        which_lottery: 'ssc',//当前要哪个彩种的数据
        cqssc:
        {
            open_codes: [1, 2, 3, 4, 5],//最后一期的开奖号码
            bingo_money: 0,//中奖金额
            lastExpect: 20180808,//上期的期数
            minute:'00',
            seconds:'00',
            hours:'00',
            thisExpect:20180808,//这期的下注期数，
            end_time:0,    //封盘时间
            open_time:0,   //开盘时间
            open_state:true, //是否接收下注
        },//ssc的一些数据
        pk10:
        {
          open_codes: [1, 2, 3, 4, 5],//最后一期的开奖号码
          bingo_money: 0,//中奖金额
          lastExpect: 20180808,//上期的期数
          minute:'00',
          seconds:'00',
          thisExpect:20180808,//这期的下注期数
          end_time:0,    //封盘时间
          open_time:0,   //开盘时间
          open_state:true, //是否接收下注
        },//ssc的一些数据
        cake:
        {
          open_codes:[1,2,3,4,5],//最后一期的开奖号码
          bingo_money:0,//中奖金额
          lastExpect:20180808,//上期的期数
          minute:'00',
          seconds:'00',
          thisExpect:20180808,//这期的下注期数
          end_time:0,    //封盘时间
          open_time:0,   //开盘时间
          open_state:true, //是否接收下注
        },//ssc的一些数据
        egg:
        {
          open_codes:[1,2,3,4,5],//最后一期的开奖号码
          bingo_money:0,//中奖金额
          lastExpect:20180808,//上期的期数
          // hour:'00',
          minute:'00',
          seconds:'00',
          thisExpect:20180808,//这期的下注期数
          end_time:0,    //封盘时间
          open_time:0,   //开盘时间
          open_state:true, //是否接收下注
        },//ssc的一些数据

    },//state

    mutations:
    {
      switch_dialog(isLogin) {//这里的state对应着上面这个states
        state.isLogin = true;
        //你还可以在这里执行其他的操作改变state
      }
    }//mutations
  });
/***********************引用vuex 和http请求插件vue-resource***********************************************/





Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
});


//引入响应式js
import './assets/js/response';





/**
  *commom function
  */

Vue.prototype.turnUrl = function ( url )
{
    router.push(url);
    return;
};

Vue.prototype.toFix2 = function ( number )
{
   return number.toFixed(2);
};

