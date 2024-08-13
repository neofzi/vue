<template>
    <div class="filter-menu">
        <h2 class="filter-menu__title">Menu</h2>
        <!-- <select id="custom-select" v-model="selectedItem" class="filter-menu__select">
            <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
            </option>
        </select> -->
        <v-select v-model="selectedItem" hide-details="auto" :items="categories"></v-select>
    </div>
</template>

<script>
export default {
    name: 'FilterMenu',
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
    emits: ['choseItem'],
    data() {
        return {
            selectedItem: 'All',
        }
    },
    watch: {
        selectedItem(newVal) {
            this.$emit('choseItem', newVal)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.filter-menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: toRem(10);
    @include adaptiveValue('margin-bottom', 30, 15);
    &__title {
        font-weight: 700;
        @include adaptiveValue('font-size', 38, 22);
    }
    :deep(.v-input) {
        @include adaptiveValue('max-width', 200, 175);
    }
    :deep(.v-input__control) {
        background-color: #084349;
        color: #fefefe;
        border-radius: toRem(5);
    }
    :deep(.v-field__input) {
        padding: toRem(10) toRem(10);
        min-height: auto;
    }
    //  &__select {
    //      background-color: #084349;
    //      color: #fefefe;
    //      border-radius: toRem(5);
    //      text-align: center;
    //      padding: toRem(5) toRem(20);
    //      cursor: pointer;
    //      transition: background-color 0.3s;
    //      @media (any-hover: hover) {
    //          &:hover {
    //              background-color: #036f71;
    //          }
    //      }
    //  }
}
</style>
