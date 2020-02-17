<template>
  <div class="user-info">
    <img class="avatar" src="~assets/img/profile/avatar.svg" alt="">
    <div class="info">
      <div class="login">
        <span>登入</span>
        <span>/</span>
        <span>注册</span>
      </div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  .user-info{
    width: 100%;
    height: 15vh;
    background: var(--color-tint);
    display: flex;
    align-items: center;
  }
  .avatar{
    flex: 1;
    margin-left: 10px;
    width: 20%;
  }
  .info{
    flex: 7;
    color: #ffffff;
  }
  .login{
    margin-left: 5px;
  }
  .phone img{
    width: 10%;
  }
  .phone span{
    font-size: 12px;
    vertical-align: super;
  }

  .arrow{
    flex: 1;
  }
  .arrow img{
    width: 70%;
  }
</style>
