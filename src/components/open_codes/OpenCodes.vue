<!--历史开奖列表-->
<template>
      <div id="open-codes">
          <ul>
            <li @click="turnUrl('open_codes_cqssc')" >
              <img src="../../assets/img/icon_ssc.png" alt="" class="lottery-logo">
              <p class="lottery-name">重庆时时彩</p>
            </li>
            <li @click="turnUrl('open_codes_pk10')">
              <img src="../../assets/img/icon_bjpk.png" alt="" class="lottery-logo">
              <p class="lottery-name">北京赛车PK拾</p>
            </li>
            <li  @click="turnUrl('open_codes_cake28')">
              <img src="../../assets/img/icon_jnd28.png" alt="" class="lottery-logo">
              <p class="lottery-name">加拿大28</p>
            </li>
            <li  @click="turnUrl('open_codes_pcegg')">
              <img src="../../assets/img/icon_lhc.png" alt="" class="lottery-logo">
              <p class="lottery-name">PC蛋蛋</p>
            </li>
          </ul>
      </div>
</template>

<script>
    export default {
        name: "OpenCodes"
    }
</script>

<style scoped>
    #open-codes
    {
      width: 100%;
      padding: 25px 10%  56px 10%;
      box-sizing: border-box;
    }
    ul
    {
      width: 100%;
      overflow: hidden;
    }
    ul>li
    {
      width: 40%;
      float: left;
      height: 8rem;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.5);
      margin-bottom: 15px;
      background: rgba(255,255,255,0.1);
    }
    ul>li:nth-child(2n)
    {
      float: right;
    }
    .lottery-logo
    {
      display: block;
      margin:0 auto;
      width: 4rem;
      height: 4rem;

      margin-top: 0.8rem;
    }
    .lottery-name
    {
      height: 3.2rem;
      line-height: 3.2rem;
      font-size: 1rem;
    }
    html,body
    {
      background: #31302E;
    }
</style>
