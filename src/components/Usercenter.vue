<!--用户中心页面-->
<template>
    <div class="user-center">

        <div class="header-info" v-show="$store.state.isLogin">
            <div class="text-left" style="text-indent:5%; font-size: 0.9rem;">
              <p class="pull-left" style="width: 50%;">用户名称: {{$store.state.nickname}}</p>
              <p class="pull-left" style="width: 50%;">可用余额: <span class="color-red">{{$store.state.cash_money,$store.state.credit_money}}</span></p>
              <p class="pull-left" style="width: 50%;">今日盈亏: <span class="color-red">{{$store.state.win_lost_today}} </span></p>
              <p class="pull-left" style="width: 50%;">今日返水: <span class="color-red">{{$store.state.return_present}} </span></p>
              <div class="clear"></div>
            </div>


        </div>


        <ul v-show="$store.state.isLogin">
            <li @click="turnUrl('money_change')">
                <i class="fa fa-credit-card"></i>
                <span class="ctxt">资金明细</span>
            </li>
            <li @click="turnUrl('unclear')">
                <i class="fa fa-line-chart"></i>
                <span class="ctxt">未结明细</span>
            </li>

            <li @click="turnUrl('clear')">
                <i class="fa fa-bar-chart"></i>
                <span class="ctxt">已结历史</span>
            </li>

            <li @click="turnUrl('diagram_clear')">
                <i class="fa fa-pie-chart"></i>
                <span class="ctxt">结算报表</span>
            </li>
            <li @click="turnUrl('open_codes')">
                <i class="fa fa-clock-o"></i>
                <span class="ctxt">历史开奖</span>
            </li>

            <li @click="turnUrl('bet_money_limit')">
                <i class="fa fa-navicon"></i>
                <span class="ctxt">玩法资讯</span>
            </li>

            <li @click="turnUrl('bet_rules')">
                <i class="fa fa-list-ol"></i>
                <span class="ctxt">玩法规则</span>
            </li>

            <li>
                <i class="fa fa-usd"></i>
                <span class="ctxt">充值</span>
            </li>

            <li>
                <i class="fa fa-yen"></i>
                <span class="ctxt">提现</span>
            </li>

            <li @click="turnUrl('subordinate')">
                <i class="fa fa-group"></i>
                <span class="ctxt">下线管理</span>
            </li>

        </ul>


        <div class="no-login" v-show="!$store.state.isLogin"  @click="turnUrl('login')">
            点击登录
        </div>



    </div>
</template>

<script>
    export default {
        name: "Usercenter",
        data()
        {
          let data =
          {

          };
          return data;
        },
        methods:
        {


        },
        created()
        {

        },
    }
</script>

<style scoped>
    .user-center
    {
        color: #F6D695;;
    }
    .txt-des
    {
        display: inline-block;
        width: 80px;
    }
    .header-info
    {

      background: rgba(255,255,255,0.1);
      font-size: 16px;
      line-height: 2.8rem;
      width: 90%;
      margin: 0 auto;
      margin-top: 45px;
    }
    ul
    {
        width: 90%;
        overflow: hidden;
        margin: 0 auto;
    }
    li
    {
        width: 48%;
        height: 5.6rem;
        background: rgba(255,255,255,0.1);
        /*margin-left: 2%;*/
        margin-top: 15px;
        float: left;
        display: flex;
        align-items: center;
    }
    li>i
    {
        font-size: 1.8rem;
        /*margin-left: 15px;*/
        width:35%;
    }
    .ctxt
    {
        font-weight: 700;
        font-size: 1.2rem;
        /*margin-left: 35px;*/
        /*font-size*/
        color: #F6D695;
        float: right;
        width: 50%;
        text-align: left;
    }
    li:nth-child(2n)
    {
        margin-left: 2%;
    }
    li:nth-child(odd)
    {
        margin-right: 2%;
    }
</style>
<style scoped>
  .no-login
  {
    width: 8rem;
    height: 8rem;
    background: red;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 5rem auto;
    color: #fff;
    line-height:8rem;
    font-size: 1.4rem;
    font-weight:700;
    background-image: -webkit-linear-gradient( 90deg, rgb(167, 134, 56) 0%, rgb(215, 173, 76) 45%, rgb(232, 199, 122) 84%, rgb(255, 229, 167) 100%);
  }
</style>
