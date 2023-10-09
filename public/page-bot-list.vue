<template>
    <div class="row">
        <div class="col-3" v-for="bot in list.data" :key="bot.id">
            <b-card class="mb-2" :title="bot.name" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article">
                <b-card-text>
                    {{ bot.name }}
                </b-card-text>

                <b-button :href="`/bot-detail?id=${bot.id}`" variant="primary">编辑</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                list: {
                    data: []
                }
            }
        },
        methods: {
            onSubmit() {},
            async read() {
                let bots = await fetch('/api/bot-list').then(resp => resp.json())
                this.list.data = bots;
            }
        },
        mounted() {
            this.read()
        }
    }
</script>