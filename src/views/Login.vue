<template>
    <div class="login">
        <a-form-model
            ref="loginForm"
            :model="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
            :rules="rules"
            @keydown.native.enter="login('loginForm')"
        >
            <a-form-model-item
                label="邮箱"
                prop="email"
                required
            >
                <a-input v-model.trim="form.email"/>
            </a-form-model-item>
            <a-form-model-item
                label="密码"
                prop="password"
                required
            >
                <a-input v-model.trim="form.password" type="password"/>
            </a-form-model-item>

            <template v-if="isRegister">
                <a-form-model-item
                    label="验证码"
                    prop="code"
                    required
                >
                    <a-input-search
                        v-model.trim="form.code"
                        enter-button="发送验证码"
                        @search="sendCode"
                    />
                </a-form-model-item>
                <a-form-model-item
                    label="用户名"
                    prop="username"
                    required
                >
                    <a-input v-model.trim="form.username"/>
                </a-form-model-item>
            </template>

            <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                <a-button type="primary" @click="login('loginForm')">
                    登录
                </a-button>
                <a-button @click="register('loginForm')">
                    注册
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import userApi from "@/api/user";

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入邮箱"));
    }
    if (emailReg.test(value)) {
        return callback();
    }
    return callback(new Error("邮箱格式不正确"));
};
const checkPassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入密码"));
    }
    return callback();
};
const checkCode = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入验证码"));
    }
    return callback();
};
const checkUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入用户名"));
    }
    return callback();
};
// 登录的验证规则
const rules = {
    email: [
        { validator: checkEmail, trigger: "change" },
    ],
    password: [
        { validator: checkPassword, trigger: "change" }
    ]
};
// 注册附加的验证规则
const registerRules = {
    code: [
        { validator: checkCode, trigger: "change" },
    ],
    username: [
        { validator: checkUsername, trigger: "change" }
    ]
};
export default {
    name: "Login",
    data() {
        return {
            form: {
                email: "",
                password: "",
                code: "",
                username: ""
            },
            isRegister: false
        };
    },
    computed: {
        rules() {
            if (this.isRegister) {
                // 注册规则
                return {
                    ...rules,
                    ...registerRules
                };
            }
            // 登录规则
            return rules;
        }
    },
    methods: {
        login(formName) {
            if (this.isRegister) {
                this.isRegister = false;
            } else {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        try {
                            const res = await userApi.login(this.form);
                            this.$store.dispatch("user/login", res);
                            this.$router.push("/");
                        } catch (err) {
                            this.$message.error(err);
                        }
                    }
                });
            }
        },
        register(formName) {
            if (this.isRegister) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        try {
                            await userApi.logon(this.form);
                            this.isRegister = false;
                            this.$message.success("注册成功");
                            this.login('loginForm');
                        } catch (err) {
                            this.$message.error(err);
                        }
                    }
                });
            } else {
                this.isRegister = true;
            }
        },
        async sendCode() {
            if (!this.form.email) {
                return this.$message.info("请先输入您邮箱");
            }
            this.$message.success("验证码以发送至您的邮箱");
            const res = await userApi.getCode({ email: this.form.email });
            return res;
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    overflow: hidden;
}
.ant-form {
    width: 500px;
    margin: 100px auto;
    border: 1px solid #eee;
    padding: 45px 0;
    border-radius: 4px;
}
.ant-row:last-of-type {
    margin: 0;
}
.ant-form-item-control {
    .ant-btn:not(:first-of-type) {
        margin-left: 10px;
    }
}
</style>
