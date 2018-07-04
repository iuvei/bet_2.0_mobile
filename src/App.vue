<template>
  <div id="app">


    <!--头部-->
    <mt-header fixed title="" style="background:#161616;">
      <mt-button slot="left" @click="go_1()" style="font-size: 18px;font-weight: 700;text-indent: 5px;">
        <
      </mt-button>
      <mt-button  slot="right">
        <i class="fa fa-navicon" style="font-size: 28px;"></i>
      </mt-button>
    </mt-header>
    <!--/头部-->

    <!--中间的内容-->
    <router-view/>
    <!--/中间的内容-->

    <!--底部的菜单-->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1">
        <i class="fa fa-home" style="display: block;width: 30px;height: 30px;font-size: 24px;margin:0 auto;"></i>
        大厅
      </mt-tab-item>




      <mt-tab-item id="2">
        <i class="fa fa-cny" style="display: block;width: 30px;height: 30px;font-size: 24px;margin:0 auto;"></i>
        充值/提现
      </mt-tab-item>

      <mt-tab-item id="3">
        <i class="fa fa-user-circle" style="display: block;width: 30px;height: 30px;font-size: 24px;margin:0 auto;"></i>
        我的
      </mt-tab-item>

      <mt-tab-item id="4">
        <i class="fa fa-gift" style="display: block;width: 30px;height: 30px;font-size: 24px;margin:0 auto;color: #e8c77a;"></i>
        活动
      </mt-tab-item>


      <mt-tab-item id="5">
        <i class="fa fa-phone-square" style="display: block;width: 30px;height: 30px;font-size: 24px;margin:0 auto;"></i>
        客服
      </mt-tab-item>
    </mt-tabbar>
    <!--/底部的菜单-->


  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
        selected:1,
    }
  },
  methods:
  {
      //返回上一页
      go_1()
      {
        window.history.go(-1);
      },
      /**
       *  每10秒获取用户的个人信息,如果没有成功的话，前去登录页面，清除绶存
       */
      get_users_info:function()
      {
        this.$http.get(this.api + "/user/" + window.sessionStorage.user_id ).then(function (response)
        {
          if(response.data.status == 200)
          {
            let  data = response.data.data.user;
            this.$store.state.username = data.username;//用户名
            this.$store.state.nickname = data.nickname;//昵称
            this.$store.state.cash_money = data.money.cash_money;//现金额度
            this.$store.state.credit_money = data.money.credit_money;//信用额度
            this.$store.state.win_lost_today = data.yk;//盈亏
            this.$store.state.return_present = data.fs;//返水
          }
          else
          {
            this.$store.state.isLogin    = false; //设置登录flag
            this.$store.state.user_id    = null;//设置登录user_id
            window.sessionStorage.isLogin  = null;  //本地会话保存登录状态
            window.sessionStorage.user_id  = null;//本地会话保存user_id
            window.sessionStorage.admin    = null;
            window.sessionStorage.agent    = null;
            window.sessionStorage.manager  = null;
            window.sessionStorage.nickname = null;
            window.sessionStorage.type     = null;
            window.sessionStorage.username = null;
            window.sessionStorage.token = null;
            window.sessionStorage.index = null;
            clearInterval(this.timeId);
            this.$router.push('/');
          }

        });
      },


  },
  created()
  {
    this.get_users_info();
  },
  watch:
  {
      "selected":function(n,o)
      {

          if(n == 1)
          {

              this.$router.push('/');
          }
          if(n == 3)
          {
              this.$router.push('usercenter');
          }

          if(n == 2)
          {
            this.$router.push('randw');
          }
      }
  }
}
</script>

<style>
  @import url('./assets/css/font-awesome.css');
  @import url('./assets/css/init.css');
#app
{
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  font-family: Microsoft JhengHei UI, Microsoft JhengHei, PingFang TC, HeiTi TC, sans-serif;
  text-align: center;
  color: #e8c77a;
  margin-top: 40px;
  /*background: #000;*/
}
  .mint-tabbar > .mint-tab-item.is-selected{
    background-image:-webkit-linear-gradient( 90deg, rgb(167, 134, 56) 0%, rgb(215, 173, 76) 45%, rgb(232, 199, 122) 84%, rgb(255, 229, 167) 100%);
    color: white;
  }
  .mint-tabbar
  {
    background: #000;
    background-image:linear-gradient( 0, rgb(0, 0, 0) 0%, rgb(51, 51, 51) 100%);
    color: #9f9f9f;
  }

</style>
