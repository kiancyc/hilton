<template>

    <el-main style="padding: 20px 60px">

        <!-- back to last page and reload -->
        <el-page-header @back="location=document.referrer" title="back"></el-page-header>

        <!-- form -->
        <el-form label-width="150px" style="margin-top:1em;width:40%;margin: 0 auto;">
            <el-form-item>
                <h1>Reservation</h1>
            </el-form-item>

            <el-form-item label="Guest Name">
                <el-input v-model="form.guest_name" placeholder="Your name" readonly></el-input>
            </el-form-item>

            <el-form-item label="Contact Info">
                <el-input v-model="form.guest_contact" placeholder="Your Contact Info" readonly></el-input>
            </el-form-item>

            <el-form-item label="Arrival Time">
                <el-date-picker v-model="form.arrival_time" type="datetime" placeholder="Arrival Time" readonly></el-date-picker>
            </el-form-item>

            <el-form-item label="Table Size">
                <el-input v-model="form.table_size" placeholder="please choose" readonly></el-input>
            </el-form-item>

        </el-form>

    </el-main>

</template>

<script>
    module.exports = {
        data: () => {
            return {
                reservation_id: new URLSearchParams(window.location.search).get('id'),
                form: {
                    _id: '',
                    guest_name: ''
                }
            }
        },
        methods: {
            async read() {
                let reservation = await axios.get(`/api/reservation/${this.reservation_id}`).then(resp => resp.data)
                this.form = reservation;
            }
        },
        mounted() {
            this.read()
        }
    }
</script>