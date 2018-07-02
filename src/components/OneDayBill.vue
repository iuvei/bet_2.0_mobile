<!--某段时间的账单-->

<template>


    <div id="unclear">

      <div class="user_message mt15">
        <!--<p> <span class="pull-left">第2018025810期</span>  <span class="pull-right">2018-05-08 14:00:00</span></p>-->
        <p>
          <span class="pull-left color-white">第2018025810期</span>
          <span class="color-gray bold pull-right">订单：2014034506084520</span>
        </p>
        <p>
          <span class="pull-left">
            下注金额：<span class="color-red">100.00</span>
          </span>
          <span class="pull-right"> 加拿大28 / 两面盘 / 小单</span>
          <!--<span class="pull-right change-money"><span class="color-red">￥100.00</span></span>-->
        </p>
        <p>
          <span class="pull-left">输赢结果：<span class="color-green">0.00</span></span>
          <span class="pull-right  ml10"> 赔率：4.200   </span>
        </p>

        <p>
          <span class="pull-left">投注时间：2018-06-19 15:30:00</span>
          <span class="color-gray bold pull-right">未中奖</span>
        </p>
      </div>




    </div>


</template>

<script>
    export default
    {
        name: "OneDayBill"
    }
</script>

<style scoped>
  #unclear
  {
    /*font-size: 0.8rem;*/
    padding-bottom: 56px;
  }

  .user_message
  {
    width: 95%;
    margin:15px auto;
    padding:0.6rem 5px;
    background: rgba(255,255,255,0.1);
    box-sizing: border-box;
    border-top: 1px solid #e8c77a;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .user_message>p
  {
    height: 25px;
    line-height: 25px;
  }

  .change-money
  {
    font-size: 1.5rem;
  }
</style>
