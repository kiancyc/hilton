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
                <el-input v-model="form.guest_contact" placeholder="Your Contact Info"></el-input>
            </el-form-item>

            <el-form-item label="Arrival Time">
                <el-date-picker v-model="form.arrival_time" type="datetime" placeholder="Arrival Time"></el-date-picker>
            </el-form-item>

            <el-form-item label="Table Size">
                <el-select v-model="form.table_size" placeholder="please choose">
                    <el-option key="2" label="2 people" value="2"></el-option>
                    <el-option key="4" label="4 people" value="4"></el-option>
                    <el-option key="6" label="6 people" value="6"></el-option>
                    <el-option key="10" label="10 people" value="10"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save()">save</el-button>
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
                    guest_name: '',
                    guest_contact: '',
                    arrival_time: '',
                    table_size: ''
                }
            }
        },
        methods: {
            async save() {

                let resp = await fetch(`/api/reservation/${this.reservation_id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        guest_name: this.form.guest_name,
                        guest_contact: this.form.guest_contact,
                        arrival_time: this.form.arrival_time,
                        table_size: this.form.table_size
                    })
                })

                let ret = await resp.json()

                if (resp.ok) {
                    this.$message.success(ret.message)
                    this.read()
                } else {
                    this.$message.error(ret.error)
                }

            },
            async read() {
                let reservation = await fetch(`/api/reservation/${this.reservation_id}`).then(resp => resp.json())
                this.form = reservation;
                console.log(reservation)
            }
        },
        mounted() {
            this.read()
        }
    }
</script>