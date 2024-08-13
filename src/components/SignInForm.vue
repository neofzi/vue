<template>
    <div class="sign-in-form">
        <div class="sign-in-form__box">
            <div class="sign-in-form__wrapper-inp">
                <v-text-field
                    v-model="user.email"
                    v-intersection
                    data-watcher
                    :rules="emailRules"
                    hide-details="auto"
                    label="Email"
                    class="sign-in-form__input"
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
                    class="sign-in-form__input"
                    @click:append-inner="showPassword = !showPassword"
                >
                    <!-- <template #append-inner>
									:type="showPassword ? 'text' : 'password'"
                            <button type="button" @click="showPassword = !showPassword">
                                <font-awesome-icon
                                    :icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                    style="color: #1d0d0b"
                                />
                            </button>
                        </template> -->
                </v-text-field>
            </div>
        </div>
        <div class="sign-in-form__buttons">
            <v-btn class="sign-in-form__btn sign-in-form__btn--width" @click="onEnter">Sign in</v-btn>
            <v-btn class="sign-in-form__btn" @click="loginWithGoogle">
                <font-awesome-icon :icon="['fab', 'google']" style="color: #f1f1f1" />
            </v-btn>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
    name: 'SignInForm',
    data() {
        return {
            user: {},
            showPassword: false,
            passwordRules: [(v) => !!v || 'required field', (v) => (v && v.length >= 8) || 'minimal length'],
            emailRules: [(v) => !!v || 'required field', (v) => /.+@.+\..+/.test(v) || 'incorrect input'],
        }
    },
    methods: {
        ...mapActions('auth', ['loginWithGoogle', 'signInUser']),
        async onEnter() {
            try {
                await this.signInUser(this.user)
                this.$router.push({
                    path: this.$route.query.redirect ? this.$route.query.redirect : '/',
                })
            } catch {
                console.log('Incorrect data entered')
            }
            this.user = {}
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.sign-in-form {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    &__input {
        &:not(:last-child) {
            margin-bottom: toRem(25);
        }
    }
    &__buttons {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: toRem(10);
    }
    &__wrapper-inp {
        margin-bottom: toRem(25);
    }
    &__btn--width {
        flex-grow: 1;
    }
    &__btn {
        background-color: #0a4647;
        color: #fff;
        white-space: none;
        text-transform: none;
        @include adaptiveValue('font-size', 22, 18);
    }
}
</style>
