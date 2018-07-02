<template>
    <div id="login">

        <div class="logo"></div>

        <form action="" class="log">
            <p class="text-left" style="font-size: 16px;margin-bottom: 3px;">账号</p>
            <input type="text" placeholder="用户名/手机号/用户id" class="user-name">

            <p class="text-left" style="font-size: 16px;margin-bottom: 3px;">账号</p>
            <input type="text" placeholder="用户名/手机号/用户id" class="pwd" >

            <button class="submit">马上登录</button>
        </form>


    </div>
</template>

<script>
    export default {
        name: "Login"
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
    }
</style>