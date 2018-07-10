<!--Pk10的下注规则-->
<template>
  <div class="pd56px">
      <div  id="des">
        <p class="title_1">
          该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网）），北京时间（GMT+8）每天白天从上午09:02开到晚上23:57，每5分钟开一次奖,每天开奖179期。
        </p>
        <p class="title_1">1～10 两面：指 单、双；大、小。</p>

        <p>单、双：号码为双数叫双，如4、8；号码为单数叫单，如5、9。</p>

        <p>大、小：开出之号码大于或等于6为大，小于或等于5为小。</p>

        <p>第一名～第十名 车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。</p>

        <p class="title_1">1～5龙虎</p>

        <p><p>冠  军 龙/虎：“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>

          <p>亚  军 龙/虎：“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>

          <p>第三名 龙/虎：“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>

          <p>第四名 龙/虎：“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>

          <p>第五名 龙/虎：“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>

          <p class="title_1">冠军车号＋亚军车号＝冠亚和值（为3~19)</p>

          <p>冠亚和单双：“冠亚和值”为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。</p>

          <p>冠亚和大小：“冠亚和值”大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。</p>

          <p>冠亚和指定：“冠亚和值”可能出现的结果为3～19， 投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。</p>
      </div>

  </div>
</template>

<script>
    export default {
        name: "BetRulesPk10"
    }
</script>

<style scoped>
    #open-codes
    {
      width: 100%;
      padding: 25px 10%  15px 10%;
      box-sizing: border-box;
      font-size: 0.8rem;
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
