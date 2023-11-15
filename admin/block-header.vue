<template>
    <el-menu mode="horizontal" :default-active="index" router active-text-color="#7039fd">

        <li class="el-menu-item" style="margin-top:-4px">
            <!-- <img src="/assets/logo.png" width="28" /> -->
            <span style="font-size:18px">Admin</span>
            <!-- <el-divider direction="vertical"></el-divider> -->
        </li>

        <el-menu-item index="/admin/reservation"> Reservations </el-menu-item>

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