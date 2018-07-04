<template>
    <div class="recharge-withdraw">

        <div class="header-tabs">
            <ul>
                <li class="active">在线充值</li>
                <li>在线提现</li>
                <li>交易记录</li>
            </ul>
        </div>


        <div class="online-recharge" v-show="false">

            <div class="wechat">
                <img src="" alt="" class="pull-left recharge-type-logo" >

                <div class="right pull-left" style="height: 50px;margin-top: 5px;margin-left: 5px;">
                    <p class="recharge-type text-left">微信转账</p>
                    <p class="recharge-description">充值时请备注您的会员号</p>
                </div>

                <div class="more">
                    >
                </div>
            </div>
            <div class="wechat">
                <img src="" alt="" class="pull-left recharge-type-logo" >

                <div class="right pull-left" style="height: 50px;margin-top: 5px;margin-left: 5px;">
                    <p class="recharge-type text-left">支付宝扫码</p>
                    <p class="recharge-description">充值时请备注您的会员号</p>
                </div>

                <div class="more">
                    >
                </div>
            </div>
            <div class="wechat">
                <img src="" alt="" class="pull-left recharge-type-logo" >

                <div class="right pull-left" style="height: 50px;margin-top: 5px;margin-left: 5px;">
                    <p class="recharge-type text-left">微信转账</p>
                    <p class="recharge-description">充值时请备注您的会员号</p>
                </div>

                <div class="more">
                    >
                </div>
            </div>
            <div class="wechat">
                <img src="" alt="" class="pull-left recharge-type-logo" >

                <div class="right pull-left" style="height: 50px;margin-top: 5px;margin-left: 5px;">
                    <p class="recharge-type text-left">微信转账</p>
                    <p class="recharge-description">充值时请备注您的会员号</p>
                </div>

                <div class="more">
                    >
                </div>
            </div>
            <div class="wechat">
                <img src="" alt="" class="pull-left recharge-type-logo" >

                <div class="right pull-left" style="height: 50px;margin-top: 5px;margin-left: 5px;">
                    <p class="recharge-type text-left">微信转账</p>
                    <p class="recharge-description">充值时请备注您的会员号</p>
                </div>

                <div class="more">
                    >
                </div>
            </div>

        </div>

        <div class="online-withdraw" v-show="true">
            <div class="withdraw-div">
              <p>提现金额</p>
              <input type="text" class="withdraw-money">

              <p class="mt15">提现密码</p>
              <input type="text" class="withdraw-money">


              <button class="confirm-withdraw">申请提现</button>
            </div>
        </div>


        <div class="history" v-show="false">
            这是交易记录。。。
        </div>
    </div>
</template>

<script>
    export default {
        name: "Randw",
        data(){
          return{

          }
        },
        methods:
        {

        }
    }
</script>

<style scoped>
    .more
    {
        height: 50px;
        line-height: 50px;
        float:right;
        font-size: 28px;
        margin-right: 20px;
        margin-top: 5px;
        color: #b1b7ba;
    }
    .recharge-type-logo
    {
        width: 50px;height: 50px;margin-top: 5px;background:red;margin-left: 5px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
    .recharge-type
    {
        font-size: 18px;
        color: #666;
    }
    .recharge-description
    {
        margin-top: 3px;
        color: #999;
    }
    .recharge-withdraw{
        width: 100%;
    }
    .header-tabs
    {
        width: 100%;
        overflow: hidden;
    }
    .header-tabs>ul{
        width: 100%;
    }
    .header-tabs>ul>li
    {
        float: left;
        width: 33.3333333%;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-left:1px solid #e5e5e5;
        border-bottom:1px solid #e5e5e5;
    }

    .header-tabs>ul>li.active
    {
        color: #26a2ff;
        border-bottom:3px solid #26a2ff;
    }
    .online-recharge
    {

        /*height: 100px;*/
        margin-top: 15px;
        overflow: hidden;
        padding-bottom: 15px;
    }
    .wechat
    {
        width: 95%;
        margin:0 auto;
        height: 60px;
        background: #e5e5e5;
        margin-top: 15px;
        border-bottom: 1px solid #fff;
    }
</style>
<style scoped>
  .withdraw-div
  {
    width: 90%;
    overflow: hidden;
    text-align: left;
    margin:15px auto;
  }
  .withdraw-money
  {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    outline: none;
    border:1px solid #e8c77a;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #575757;
    box-sizing: border-box;
  }
  .confirm-withdraw
  {
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    padding:8px;
    background-image: linear-gradient(0deg, #e4b340 0%, #a78638 15%, #d7ad4c 40%, #e8c77a 80%, #ffe5a7 100%);
    color: #fff;
    border: none;
    font-size: 1rem;
    font-weight: 700;
  }
</style>
