<template>
    <div class="user-center">

        <div class="header-info">
            <div class="text-left" style="text-indent:5%;">
                用户名称:shady111 <span class="pull-right mr10">可用余额: <span class="color-red">1000.00</span></span>
                <div class="clear"></div>
            </div>
        </div>


        <ul>
            <li @click="turnUrl('money_change')">
                <i class="fa fa-credit-card"></i>
                <span class="ml10 ctxt">资金明细</span>
            </li>
            <li @click="turnUrl('unclear')">
                <i class="fa fa-line-chart"></i>
                <span class="ml10 ctxt">未结明细</span>
            </li>

            <li @click="turnUrl('clear')">
                <i class="fa fa-bar-chart"></i>
                <span class="ml10 ctxt">已结历史</span>
            </li>

            <li @click="turnUrl('diagram_clear')">
                <i class="fa fa-pie-chart"></i>
                <span class="ml10 ctxt">结算报表</span>
            </li>
            <li @click="turnUrl('open_codes')">
                <i class="fa fa-clock-o"></i>
                <span class="ml10 ctxt">历史开奖</span>
            </li>

            <li @click="turnUrl('bet_money_limit')">
                <i class="fa fa-navicon"></i>
                <span class="ml10 ctxt">玩法资讯</span>
            </li>

            <li @click="turnUrl('bet_rules')">
                <i class="fa fa-list-ol"></i>
                <span class="ml10 ctxt">玩法规则</span>
            </li>

            <li>
                <i class="fa fa-usd"></i>
                <span class="ml10 ctxt">充值</span>
            </li>

            <li>
                <i class="fa fa-yen"></i>
                <span class="ml10 ctxt">提现</span>
            </li>

            <li>
                <i class="fa fa-group"></i>
                <span class="ml10 ctxt">下线管理</span>
            </li>

        </ul>



    </div>
</template>

<script>
    export default {
        name: "Usercenter",
        data()
        {
          return{

          }
        },
        methods:
        {



        }
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

      height: 60px;
      line-height: 60px;
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
        height: 80px;
        background: rgba(255,255,255,0.1);
        /*margin-left: 2%;*/
        margin-top: 15px;
        float: left;
        display: flex;
        align-items: center;
    }
    li>i
    {
        font-size: 30px;
        /*margin-left: 15px;*/
        width: 50%;
    }
    .ctxt
    {
        font-weight: 700;
        font-size: 16px;
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
