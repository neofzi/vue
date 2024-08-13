<template>
    <main-master-page>
        <div class="admin-view">
            <div class="admin-view__container">
                <h2 class="admin-view__title">{{ actionTitle }}</h2>
                <div class="admin-view__box">
                    <v-text-field v-model="productData.title" hide-details="auto" label="Product title"></v-text-field>
                    <v-text-field v-model="productData.text" hide-details="auto" label="Product text"></v-text-field>
                    <v-text-field
                        v-model="productData.price"
                        type="number"
                        hide-details="auto"
                        label="Product price"
                    ></v-text-field>
                    <v-text-field
                        v-model="productData.oldPrice"
                        type="number"
                        hide-details="auto"
                        label="Product old price"
                    ></v-text-field>
                    <v-text-field
                        v-model="productData.category"
                        hide-details="auto"
                        label="Product category"
                    ></v-text-field>
                    <v-file-input
                        ref="fileInput"
                        label="Import file"
                        hide-details="auto"
                        variant="filled"
                        prepend-icon="mdi-camera"
                        type="file"
                        @change="handleFileUpload"
                    ></v-file-input>
                </div>
                <div class="admin-view__buttons">
                    <button :disabled="isDisabled" type="button" class="admin-view__btn" @click="saveProduct">
                        {{ actionButtonTitle }}
                    </button>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterPages/MainMasterPage'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AdminAddProdView',
    components: {
        MainMasterPage,
    },
    data() {
        return {
            productData: {},
            imageFile: null,
        }
    },
    computed: {
        ...mapGetters('menu', ['getItemById']),
        receivedId() {
            return this.$route.params.id
        },
        actionButtonTitle() {
            return this.receivedId ? 'Save' : 'Create'
        },
        actionTitle() {
            return this.receivedId ? 'Update product' : 'Add product'
        },
        isDisabled() {
            return !(
                this.productData.title &&
                this.productData.text &&
                this.productData.price &&
                this.productData.category &&
                this.imageFile
            )
        },
    },
    created() {
        this.productData = { ...this.getItemById(this.receivedId) }
    },
    methods: {
        ...mapActions('menu', ['addItem', 'loadImage', 'updateItem']),
        async saveProduct() {
            try {
                if (this.validateProductData()) {
                    if (this.imageFile) {
                        const downloadURL = await this.loadImage(this.imageFile)
                        this.productData.img = downloadURL
                    }
                    this.productData.price = parseFloat(this.productData.price)
                    this.productData.oldPrice = parseFloat(this.productData.oldPrice)
                    if (this.receivedId) {
                        // Якщо є отриманий ID, оновлюємо існуючий продукт
                        await this.updateItem({ itemId: this.receivedId, data: this.productData })
                        console.log('Product updated successfully')
                    } else {
                        // Якщо ID немає, додаємо новий продукт
                        await this.addItem(this.productData)
                        console.log('Product added successfully')
                    }
                } else {
                    console.log('Product data is invalid')
                }
            } catch (error) {
                console.error('Error saving product:', error)
            }
        },
        validateProductData() {
            return this.productData.title && this.productData.price
        },
        handleFileUpload(event) {
            this.imageFile = event.target.files[0]
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.admin-view {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    // .admin-view__title
    &__title {
        font-weight: 700;
        text-align: center;
        @include adaptiveValue('margin-bottom', 50, 25);
        @include adaptiveValue('font-size', 38, 22);
    }
    // .admin-view__box
    &__box {
        display: flex;
        flex-direction: column;
        gap: toRem(20);
        @include adaptiveValue('margin-bottom', 50, 25);
    }
    &__buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__btn {
        padding: toRem(10) toRem(10);
        background-color: #084349;
        border-radius: toRem(5);
        min-width: toRem(200);
        color: #fefefe;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s;
        @media (any-hover: hover) {
            &:hover {
                background-color: #036f71;
            }
        }
        &:disabled {
            cursor: default;
            background-color: #6f6f6f;
        }
    }
}
</style>
