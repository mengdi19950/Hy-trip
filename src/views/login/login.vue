<template>
  <div class="login">
    <div class="top-infos">
      <h1 class="title">登录</h1>
      <p class="info">新用户登录即自动注册账号</p>
    </div>
  <form @submit.prevent="onSubmit" ref="formRef">
    <div class="infos">
      <div class="input-tel">
        <div class="area-code">
          <van-icon name="plus" class="plus" size="14"/>
          <span class="code">86</span>
        </div>
        <div class="tel-number">
          <input type="tel" 
                 v-model="phone" 
                 placeholder="输入手机号码" 
                 required 
                 maxlength="11" 
                 class="phone"/>
        </div>
      </div>
      <div class="input-verify">
        <div class="msg-code">
          <input type="text" v-model="verificationCode" placeholder="输入短信验证码" required maxlength="6" class="msg"/>
        </div>
          <button :class="['msg-btn',isFill ? 'active':'']" @click="getVerificationCode" :disabled="disableGetCodeButton">{{ codeButtonText }}</button>
      </div>
  </div>

    <div class="notice">
      <input type="checkbox" v-model="agreed" class="agree"/>
      <span class="text">我已阅读并同意<a href="javascript:;">《服务协议》</a></span>
    </div>

    <button type="submit" :class="['login-btn',isAllFill ? 'active':'']" :disabled="disableLoginButton">登录/注册</button>
</form>
    <div class="user-password" @click="userLogin">账号密码登录</div>

    <span class="error" v-if="showFailToast">
      {{ toastInfo }}
    </span>

  </div>
</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const formRef = ref(null)
const toastInfo = ref('error')
const phone = ref('')
const showFailToast = ref(false)
const isFill = ref(false)
const isAllFill = ref(false)
const verificationCode = ref('')
const disableGetCodeButton = ref(false)
const codeCountdown = ref(60)
const codeButtonText = ref('获取验证码')
const isTiming = ref(false)
const timer = ref(null)
const agreed = ref(false)
const disableLoginButton = ref(true)

// onMounted(() => {
//   phone.value = localStorage.getItem('phone') || ''
// })


const isValidPhone = computed(() => {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(phone.value)
})

watch(phone,(newV)=> {
  //手机号输入完成后获取验证码亮起
  if(newV.length == 11) {
    isFill.value = true
  } else {
    isFill.value = false
  }
})

watch(verificationCode,(newV)=> {
  // 手机号和验证码输入完成后 登录/注册按钮亮起
  if(newV.length == 6 && isFill.value == true) {
    isAllFill.value = true
    disableLoginButton.value = false
  }
})

const showToast = (item) => {
  toastInfo.value = item
  showFailToast.value = true //展示错误提示弹窗 1.8秒后关闭
  setTimeout(() => {
    showFailToast.value = false
  },1800)
}

// 获取验证码
const getVerificationCode = () => {
  //检查手机号是否有效
  if(isValidPhone.value === false) {
    showToast('格式错误，请重新输入')
    phone.value = ''
  } else {
  //开始倒计时
  isTiming.value = true
    disableGetCodeButton.value = true //禁止点击
    timer.value = setInterval(() => {
      codeCountdown.value--;
      if (codeCountdown.value <= 0) {
        clearInterval(timer.value);
        isTiming.value = false
        codeCountdown.value = 60;
        disableGetCodeButton.value = false;
        codeButtonText.value = '获取验证码';
      } else {
        codeButtonText.value = `重新获取(${codeCountdown.value}s)`;
      }
    }, 1000);
  }
  //检查手机号是否已经注册
  // if(phone.value !== localStorage.getItem('phone')){
  //   toastInfo.value = '该手机号未注册过'
  //   showToast()
  // }
  //发送验证码到手机

};

// 登录/注册
const onSubmit = () => {
  //检查验证码是否正确
  //检查是否同意协议
  watch(agreed, (newValue) => {
  disableLoginButton.value = !newValue
  })
  if(isValidPhone.value === false) {
    showToast('格式错误，请重新输入')
    phone.value = ''
    verificationCode.value = ''
    isAllFill.value = false
  } else if(!agreed.value) {
    disableLoginButton.value = true
    showToast('请先勾选并同意服务协议，才能进行下一步操作')
  } else {
    localStorage.setItem('phone',phone.value)//将手机号存储在localStorage中
    router.replace(route.query.redirect || '/') //登录后跳转回之前浏览页面
    clear()
    }
    
}



const clear = () => {
  formRef.value.reset()
  phone.value = ''
  verificationCode.value = ''
  isAllFill.value = false
  disableLoginButton.value = true
  agreed.value = false
  clearInterval(timer.value)
  isTiming.value = false
  codeCountdown.value = 60;
  disableGetCodeButton.value = false;
  codeButtonText.value = '获取验证码';
}

// const userLogin = () => {
//   // router.push('/register')
// }



</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  overflow-y: hidden;
  padding: 40px 20px 0;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  min-height: 480px;
  position: relative;
  box-sizing: border-box;
  margin: 0;

  .title {
    font-weight: 500;
    font-size: 32px;
    position: relative;
  }
  .title:before{
    content: "";
    position: absolute;
    top: 1px;
    left: -20px;
    width: 4px;
    height: 32px;
    background: #fd8238;
    box-shadow: 0 2px 18px 0 #fd8238;
  }
  .info {
    margin-top: 10px;
    color: #999;
    line-height: 14px;
    font-size: 14px;
  }
  .infos{
    margin-bottom: 30px;
    .input-tel {
      margin-top: 30px;
      color: #333;
      display: flex;
      border-bottom: 1px solid #e9e9e9;
      .area-code {
        margin-right: 20px;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
      }
      .area-code:after {
          content: "";
          position: absolute;
          bottom: 10px;
          right: -12px;
          border: 4px solid rgba(0,0,0,0);
          border-bottom: 4px solid #666;
          width: 0;
          height: 0;
          -webkit-transform: rotate(135deg);
          -ms-transform: rotate(135deg);
          transform: rotate(135deg);
        }
      .tel-number {
        flex: 1;
        position: relative;
        .phone {
          border: none;
          font-size: 20px;
          color: #333;
          height: 44px;
          padding: 11px 0;
          line-height: 44px;
          width: 80%;
          box-sizing: border-box;
        }
      }
    }
    .input-verify {
      margin-top: 10px;
      color: #333;
      height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      .msg-code {
        flex: 1;
        .msg {
          border: none;
          width: 80%;
          font-size: 20px;
          color: #333;
          box-sizing: border-box;
          height: 44px;
        }
      }
      .msg-btn {
        position: relative;
        padding: 8px 13px;
        border: none;
        border-radius: 5px;
        background-color: #d9d9d9;
        color: #fff;
      }
      .active{
        background-color: var(--primary-color);
      }
    }
  }

  .login-btn {
    height: 44px;
    display: inline-block;
    width: 100%;
    border: none;
    background-color: #d9d9d9;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;

    &.active{
      background-color: var(--primary-color);
    }
    
  }
  .user-password {
    margin-top: 20px;
    color: #666;
    text-align: center;
  }
  .error {
    background-color:rgba(0,0,0,0.6);
    padding: 15px;
    border-radius: 8px;
    color: #fff;
    position: absolute;
    left: 50%;
    bottom:35%;
    transform: translate(-50%);

    
  }
  .notice {
    position: absolute;
    top: 480px;
    // bottom: 130px;
    left: 100px;
    display: flex;
    .agree {
      margin-right: 5px;
      width: 15px;
      height: 15px;
      font-size: 12px;
      position: relative;
    }  
    .agree:checked::after{
      position: absolute;
      top: 0;
      bottom: 0;
      text-align: center;
      color: #fff;
      width: 15px;
      height: 15px;
      background-color: var(--primary-color);
      border-color:var(--primary-color);
      content: "✓";
      font-size: 12px;
      border-radius: 1px;
    }
    .text {
      color: #999;
    }

  }
}
</style>