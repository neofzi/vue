<template>
    <!-- <main-master-page /> -->
    <div class="register-form">
        <div class="register-form__box">
            <div class="register-form__wrapper-inp">
                <v-text-field
                    v-model="user.firstName"
                    v-intersection
                    data-watcher
                    :rules="nameRules"
                    hide-details="auto"
                    label="First name"
                    class="register-form__input"
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="user.lastName"
                    v-intersection
                    data-watcher
                    :rules="nameRules"
                    hide-details="auto"
                    label="Last name"
                    class="register-form__input"
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="user.email"
                    v-intersection
                    data-watcher
                    :rules="emailRules"
                    hide-details="auto"
                    label="Email"
                    class="register-form__input"
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="user.password"
                    v-intersection
                    data-watcher
                    :rules="passwordRules"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    hide-details="auto"
                    label="Password"
                    class="register-form__input"
                    @click:append-inner="showPassword = !showPassword"
                >
                </v-text-field>
            </div>
            <div class="register-form__buttons">
                <v-btn class="register-form__btn register-form__btn--width" @click="onEnter">Register</v-btn>
                <v-btn class="register-form__btn" @click="loginWithGoogle">
                    <font-awesome-icon :icon="['fab', 'google']" style="color: #f1f1f1" />
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'RegisterForm',
    data() {
        return {
            user: {},
            showPassword: false,
            passwordRules: [(v) => !!v || 'Required field', (v) => (v && v.length >= 8) || 'Minimal length'],
            emailRules: [(v) => !!v || 'Required field', (v) => /.+@.+\..+/.test(v) || 'Incorrect input'],
            nameRules: [(v) => !!v || 'Required field', (v) => v.length >= 2 || 'Minimal length'],
        }
    },
    methods: {
        ...mapActions('auth', ['loginWithGoogle', 'createUser']),
        async onEnter() {
            try {
                await this.createUser(this.user)
                this.$router.push({
                    name: 'home',
                })
            } catch (error) {
                console.log(error)
            }
            this.user = {}
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.register-form {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    &__title {
        font-weight: 700;
        text-align: center;
        margin-bottom: toRem(30);
        @include adaptiveValue('font-size', 38, 22);
    }
    &__input {
        &:not(:last-child) {
            margin-bottom: toRem(25);
        }
    }
    &__wrapper-inp {
        margin-bottom: toRem(25);
    }
    &__buttons {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: toRem(10);
    }
    &__btn--width {
        flex-grow: 1;
    }
    &__btn {
        background-color: #0a4647;
        color: #fff;
        text-transform: none;
        @include adaptiveValue('font-size', 22, 18);
    }
}
</style>
