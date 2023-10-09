<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/bot">Bot</b-nav-item>
                    <b-nav-item href="/bot-list">BotList</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {

            }
        },
        methods: {},
        mounted() {

        }
    }
</script>