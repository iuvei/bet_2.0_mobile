<template>
      <div class="add-one">
         <p class="top-text">请选择类型</p>
        <select name="user_type" id="user_type">
          <option value="0">普通用户</option>
          <option value="1">代理用户</option>
        </select>

        <p class="top-text">用户名</p>
        <input type="text" class="username" placeholder="请设置用户名">

        <p class="top-text">昵称</p>
        <input type="text" class="username" placeholder="请设置昵称">


        <p class="top-text">登录密码</p>
        <input type="text" class="username" placeholder="请设置登录密码">

        <p class="top-text">登录支付密码</p>
        <input type="text" class="username" placeholder="请设置支付密码">


        <button class="submit main-bg">添加</button>
      </div>
</template>

<script>
    export default {
        name: "AddSubordinate"
    }
</script>

<style scoped>
  .submit
  {
    width: 100%;
    height: 2.5rem;
    margin-top: 1.4rem;
    outline: none;
    border:none;
    color: #f3f3f3;
    font-weight: 700;
    font-size: 1rem;
  }
  input::-webkit-input-placeholder{
    color:#f3f3f3;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#f3f3f3;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#f3f3f3;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#f3f3f3;
  }
  .username
  {
    height: 2rem;
    width: 100%;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
    background: #838383;
    color:#f3f3f3;
    font-size: 0.9rem;
    border:none;
    text-indent: 0.3rem;
  }
  #user_type
  {
    height: 2rem;
    width: 100%;
    text-align: center;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
    background: #838383;
    color:#f3f3f3;
    font-size: 0.9rem;
  }
  .top-text
  {
    margin-bottom: 0.3rem;
    margin-top: 0.8rem;
  }
  .add-one
  {
    width: 90%;
    margin:0 auto;
    text-align: left;
    font-size: 1rem;
    margin-top: 58px;
  }
</style>
