<template>
    <div id="login">

        <div class="logo"></div>

        <form action="" class="log">
            <p class="text-left" style="font-size: 16px;margin-bottom: 3px;">账号</p>
            <input type="text" placeholder="请输入用户名" v-model="username" class="user-name">

            <p class="text-left" style="font-size: 16px;margin-bottom: 3px;">密码</p>
            <input type="password" placeholder="请输入密码" class="pwd" v-model="password" >

            <button class="submit main-bg" @click="login">马上登录</button>
        </form>


    </div>
</template>

<script>
    export default {
        name: "Login",
        data()
        {
          let data =
          {
            username:"",
            password:"",
          };

          return data;
        },
        methods:
        {
          login: function()
          {

            //用户名验证
            let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if(!uPattern.test(this.username))
            {


              this.$toast({
                message: '用户名格式不对',

              });

              return false;
            }
            //密码验证
            let pwdPattern = /^[0-9a-zA-Z]{6,16}$/;
            if(!pwdPattern.test(this.password))
            {


              this.$toast({
                message: '密码格式不对',
              });
              return false;
            }

            //发送登录请求
            this.$http.post(this.api + '/token', {username: this.username, pwd_1: this.password}).then(function (response)
            {
              //登录成功
              if(response.data.status == 200)
              {

                this.$toast({message: '欢迎回来',});
                window.sessionStorage.token = response.data.data.token;
                this.$store.state.isLogin = true; //设置登录flag
                this.$store.state.user_id = response.data.data.user_id;//设置登录user_id
                window.sessionStorage.isLogin = 'ok';  //本地会话保存登录状态
                window.sessionStorage.user_id = response.data.data.user_id;//本地会话保存user_id
                this.get_user_info(response.data.data.user_id);//获取用户信息
                this.$router.push('/usercenter');//跳转到用户中心 不刷新   window.location.href会刷新
                //window.location.href = '/#/index';
              }
              else
              {
                // alert(response.data.msg);
                this.$toast({
                  message: response.data.msg,
                });

              }
            });
          },
          /**
           * 获取用户的信息
           * @param user_id
           */
          get_user_info(user_id)
          {
            this.$http.get(this.api + "/user/" + user_id ).then(function (response) {
              if (response.data.status == 200) {
                let data = response.data.data.user;
                this.$store.state.username = data.username;//用户名
                this.$store.state.nickname = data.nickname;//昵称
                this.$store.state.cash_money = data.money.cash_money;//现金额度
                this.$store.state.credit_money = data.money.credit_money;//信用额度
                this.$store.state.win_lost_today = data.yk;//盈亏
                this.$store.state.return_present = data.fs;//返水
              }

            });
          }
        },
        created:function()
        {
          //用户登录了，提示不能已登录  并跳转到主页
          if(this.$store.state.isLogin ||window.sessionStorage.isLogin == "ok")
          {
            //alert('你已登录！');
            this.$router.push('/');
          }
        },

    }
</script>

<style scoped>
    #login
    {
        width: 100%;
        box-sizing: border-box;
        padding: 10%;
    }
    input.user-name,input.pwd
    {
        width: 100%;
        height: 36px;
        border-radius:3px;
        outline: none;
        border:1px solid #c0c3c3;
        margin-bottom: 25px;
    }
    .logo
    {
        width: 180px;
        background: #f3f3f3;
        height: 80px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        margin:0 auto;
        margin-bottom: 15px;
    }
    .submit
    {
        width: 100%;
        height: 40px;
        text-align: center;
        font-weight: 700;
        border:none;
      color: #fff;
    }
</style>
