<template>
    <main-master-page>
        <div class="logins">
            <div class="logins__container">
                <h2 class="logins__title">My account</h2>
                <div class="logins__box">
                    <v-btn-toggle v-model="btnForm" rounded="2" group>
                        <v-btn value="singIn" class="logins__btn" @click="onSingIn">Sing In </v-btn>
                        <v-btn value="register" class="logins__btn" @click="onRegister">Register </v-btn>
                    </v-btn-toggle>
                </div>
                <component :is="currentComponent" />
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterPages/MainMasterPage'
import RegisterForm from '@/components/RegisterForm.vue'
import SignInForm from '@/components/SignInForm.vue'
export default {
    name: 'LoginView',
    components: {
        MainMasterPage,
        SignInForm,
        RegisterForm,
    },
    data() {
        return {
            currentComponent: 'SignInForm',
            btnForm: 'singIn',
        }
    },
    methods: {
        onSingIn() {
            this.currentComponent = 'SignInForm'
        },
        onRegister() {
            this.currentComponent = 'RegisterForm'
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.logins {
    // .logins__title
    &__title {
        font-weight: 700;
        text-align: center;
        margin-bottom: toRem(30);
        @include adaptiveValue('font-size', 38, 22);
    }
    // .logins__container
    &__container {
        max-width: toRem(500);
    }
    // .logins__box
    &__box {
        max-width: toRem(500);
        margin: 0 auto;
        text-align: center;
    }
    // .logins__btn
    &__btn {
        width: 50%;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        color: #fefefe;
        background-color: #0a4647;
        font-weight: 600;
        padding: toRem(12) toRem(10);
        @include adaptiveValue('font-size', 20, 16);
    }
    .v-btn-group {
        width: 100%;
        height: min-content;
    }
    :deep(.v-btn__content) {
        white-space: normal;
    }
}
</style>
