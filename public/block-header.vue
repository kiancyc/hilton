<template>
    <el-menu mode="horizontal" :default-active="index" router active-text-color="#7039fd">

        <li class="el-menu-item" style="margin-top:-4px">
            <!-- <img src="/assets/logo.png" width="28" /> -->
            <span style="font-size:18px">Hilon Restaurant</span>
            <!-- <el-divider direction="vertical"></el-divider> -->
        </li>

        <el-menu-item index="/reserve"> Reserve </el-menu-item>
        <el-menu-item index="/my"> My Reservations </el-menu-item>
        <el-menu-item index="/admin/" style="float:right"> Admin </el-menu-item>

    </el-menu>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                index: `/`
            }
        },
        watch: {
            $route() {
                this.index = document.location.pathname;
            }
        },
        methods: {

        },
        mounted() {
            this.index = document.location.pathname;
        }
    }
</script>