<!-- 报表明细  本周 本月-->
<template>
    <div id="details">

        <div class="details-header" style="border:1px solid rgba(255,255,255,1);">
            <h2 class="white-day"> <span class="color-white fsb">本周</span>   <span class="pull-right mr10 more-bottom">6月11日 - 6月18日</span></h2>


          <p class="total">
            <span class="pull-left">累计投注：<span class="color-white">1000.00</span></span>
            <span class="pull-right mr10 ">投注笔数：10</span>
          </p>

          <p class="total">
            <span class="pull-left">累计退水：<span class="color-white">1000.00</span></span>
            <span class="pull-right mr10">总计盈亏：<span class="color-red">200.00</span>  </span>
          </p>

          <p class="total">
            <span class="pull-left">累计充值：<span class="color-white">1000.00</span></span>
            <span class="pull-right mr10">累计提现：<span class="color-red">200.00</span>  </span>
          </p>

        </div>


      <div class="details-header" @click="turnUrl('one_day')" style="border:1px solid rgba(255,255,255,0.4);">
        <h3 class="white-day"> <span class="color-white">2018-06-11</span>   <span class="pull-right mr10 more-bottom">周一</span></h3>
        <p class="total">
          <span class="pull-left">累计投注：<span class="color-white">1000.00</span></span>
          <span class="pull-right mr10 ">投注笔数：10</span>
        </p>

        <p class="total">
          <span class="pull-left">累计退水：<span class="color-white">1000.00</span></span>
          <span class="pull-right mr10">总计盈亏：<span class="color-red">200.00</span>  </span>
        </p>

        <p class="total">
          <span class="pull-left">累计充值：<span class="color-white">1000.00</span></span>
          <span class="pull-right mr10">累计提现：<span class="color-red">200.00</span>  </span>
        </p>

      </div>










    </div>
</template>

<script>
    export default
    {
        name: "DiagramDetails"
    }
</script>

<style scoped>
    #details
    {
      padding-bottom: 56px;
      overflow: hidden;
      font-size: 0.8rem;
    }

    .details-header
    {
      box-sizing: border-box;
      width: 90%;
      margin:0 auto;
      padding: 8px 5%;
      /*border-top:1px solid rgba(255,255,255,0.5);*/
      /*border-bottom:1px solid rgba(255,255,255,0.5);*/
      margin-top: 15px;
      text-align: left;
      background: rgba(255,255,255,0.1);
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
    .white-day
    {
      font-size: 1.2rem;
      margin-bottom: 10px;
      height: 2rem;
      line-height: 2rem;

    }
    .total
    {
      font-size: 0.8rem;
      line-height: 1.5rem;
    }
    .header-span
    {
       display:inline-block;
       width: 30%;
    }
    .w20
    {
      width: 20%;
    }
    .w40
    {
      width:40%;
    }

   .tttt
   {
     width: 100%;
     padding:5px 5%;
     margin-top: 25px;
     border-top:1px solid rgba(255,255,255,0.5);
     border-bottom:1px solid rgba(255,255,255,0.5);
     overflow: hidden;
   }
   .t-left
   {
     width: 25%;
     height: 60px;
     float: left;
   }
   .t-left>p:first-child
   {
      height: 30px;
      line-height: 30px;
      font-size: 1.1rem;
      font-weight:700;
   }
   .t-left>p:last-child
   {
     height: 30px;
     line-height:30px;
   }
   .t-middle
   {
     width: 34%;
     float: left;
     text-align: left;
     text-indent: 10px;
   }
   .t-middle>p
   {
     height:30px;
     line-height: 30px;
     font-size: 1.0rem;
   }
  .fsb
  {
    font-size: 1.8rem;
  }
  .more-bottom
  {
    line-height: 2.4rem;
  }
</style>
