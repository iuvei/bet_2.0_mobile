<!--下级管理-->
<template>
    <div id="subordinate">
        <div class="sub-head">

          <button class="pull-left add-sub-btn main-bg">添加下级</button>

          <div class="search-wrap pull-right">
            <input type="text" class="search-name" placeholder="请输入下级名称">
            <button class="fa fa-search search-btn main-bg"></button>
          </div>
          <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Subordinate"
    }
</script>

<style scoped>
    .search-name
    {
      width: 100%;
      height: 2rem;
      margin-top: 0.5rem;
      -webkit-border-radius: 0.3rem;
      -moz-border-radius: 0.3rem;
      border-radius: 0.3rem;
      border:none;
      font-size: 0.8rem;
      text-indent: 10px;
    }
    .search-btn
    {
      position: absolute;
      right: 0;
      top: 0.5rem;
      width: 2rem;
      height: 2rem;
      border-top-right-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
      border: none;
      outline: none;
      color: #fff;
    }
    .search-wrap
    {
      position: relative;
      width: 50%;
    }
    .add-sub-btn
    {
      height: 2rem;
      border:none;
      box-sizing: border-box;
      width: 30%;
      margin-top: 0.5rem;
      margin-left: 1rem;
      -webkit-border-radius: 0.3rem;
      -moz-border-radius: 0.3rem;
      border-radius: 0.3rem;
      color: #f3f3f3;
      font-size: 0.8rem;
      font-weight: 700;
    }
    #subordinate{width:100%;}
    .sub-head
    {
      height: 3rem;
      width: 95%;
      margin:48px auto 0.5rem;
      -webkit-border-radius: 0.5rem;
      -moz-border-radius: 0.5rem;
      border-radius: 0.5rem;
      background: rgba(255,255,255,0.1);
    }

</style>
