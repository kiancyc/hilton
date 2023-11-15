<template>
    <el-main style="padding: 60px 60px">

        <el-form label-width="150px" style="margin-top:1em;width:40%;margin: 0 auto;">
            <el-form-item>
                <h1>Reserve</h1>
            </el-form-item>

            <el-form-item label="Guest Name">
                <el-input v-model="form.guest_name" placeholder="Your Name"></el-input>
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
                <el-button @click="reserve()" type="primary">reserve</el-button>
            </el-form-item>

        </el-form>

    </el-main>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                form: {
                    guest_name: '',
                    guest_contact: '',
                    arrival_time: null,
                    table_size: 2
                }
            }
        },
        methods: {
            async reserve() {

                let ret = await axios.post('/api/reservation/', {
                    guest_name: this.form.guest_name,
                    guest_contact: this.form.guest_contact,
                    arrival_time: this.form.arrival_time,
                    table_size: this.form.table_size
                }).then(resp => resp.data).catch(err => err.response.data)

                if (ret.error)
                    this.$message.error(ret.error)
                else
                    this.$message.success(ret.message)

            }
        },
        mounted() {

        }
    }
</script>