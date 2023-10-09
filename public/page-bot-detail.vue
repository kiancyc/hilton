<template>

    <b-form @submit="onSubmit">
        <b-form-group label="名称:" description="机器人的名字">
            <b-form-input v-model="form.name" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="指引:">
            <b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

</template>

<script>
    module.exports = {
        data: () => {
            return {
                show: true,
                bot_id: new URLSearchParams(window.location.search).get('id'),
                form: {
                    name: ''
                }
            }
        },
        methods: {
            onSubmit() {},
            async read() {
                let bot = await fetch(`/api/bot/${this.bot_id}`).then(resp => resp.json())
                this.form.name = bot.name;
            }
        },
        mounted() {
            this.read()
        }
    }
</script>