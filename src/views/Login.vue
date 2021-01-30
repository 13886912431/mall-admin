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
                label="E-mail"
                prop="email"
                required
            >
                <a-input v-model.trim="form.email"/>
            </a-form-model-item>
            <a-form-model-item
                label="Password"
                prop="password"
                required
            >
                <a-input v-model.trim="form.password" type="password"/>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                <a-button type="primary" @click="login('loginForm')">
                    登录
                </a-button>
                <a-button @click="register">
                    注册
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import userApi from "@/api/user";

export default {
    name: "Login",
    data() {
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
        return {
            form: {
                email: "",
                password: ""
            },
            rules: {
                email: [
                    { validator: checkEmail, trigger: "change" },
                ],
                password: [
                    { validator: checkPassword, trigger: "change" }
                ]
            }
        };
    },
    methods: {
        login(formName) {
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
        },
        register() {
            this.$message.info("此功能还未开发");
        }
    }
};
</script>

<style lang="less" scoped>
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
