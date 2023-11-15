<template>
    <el-main>

        <!-- filter -->
        <el-row>
            <el-card style="height:80px;">
                <el-form :inline="true" @submit.native.prevent>
                    <el-form-item>
                        <el-input v-model="query.guest_name" placeholder="Your Name" clearable>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="search">Search</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>

        <!-- list -->
        <el-row :gutter="20">
            <el-col :lg="6" :sm="12" :xs="24" v-for="(reservation, $index) in reservations" :key="reservation._id">
                <el-card style="margin: 1em 0 0 0;">
                    <!-- header -->
                    <div slot="header" class="clearfix">
                        <span>Reservation
                            {{ $index + 1 }}
                        </span>
                        <el-tooltip content="Cancel" placement="top" style="float: right; margin: 2px">
                            <el-link icon="el-icon-close" :underline="false" @click.stop="cancel(reservation._id)">
                            </el-link>
                        </el-tooltip>

                        <el-tooltip content=" Update" placement="top" style="float: right; margin: 2px">
                            <el-link icon="el-icon-edit" :underline="false" :href="`/update?id=${reservation._id}`">
                            </el-link>
                        </el-tooltip>
                    </div>
                    <!-- body -->
                    <div class="text item">
                        <el-form label-width="100px">
                            <el-form-item label="Guest Name:">
                                {{ reservation.guest_name }}
                            </el-form-item>
                            <el-form-item label="Contact Info:">
                                {{ reservation.guest_contact }}
                            </el-form-item>
                            <el-form-item label="Arrival Time:">
                                <span v-if="reservation.arrival_time">
                                    {{ dayjs(reservation.arrival_time).format('YY/M/D HH:mm') }}
                                </span>
                            </el-form-item>
                            <el-form-item label="Table Size:">
                                {{ reservation.table_size }}
                            </el-form-item>
                            <el-form-item label="Status:">
                                <el-link v-if="reservation.status == 'reserved'" type="success" :underline="false">
                                    {{ reservation.status }}
                                </el-link>
                                <el-link v-if="reservation.status == 'canceled'" type="warning" :underline="false">
                                    {{ reservation.status }}
                                </el-link>
                                <el-link v-if="reservation.status == 'completed'" type="info" :underline="false">
                                    {{ reservation.status }}
                                </el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </el-main>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                query: {
                    guest_name: new URLSearchParams(window.location.search).get('guest_name'),
                },
                form: {
                    guest_name: ''
                },
                reservations: []
            }
        },
        methods: {
            async read() {
                if (!this.query.guest_name) {
                    this.$message.warning("please enter your name")
                    return
                }

                let reservations = await axios.get(`/api/reservation/`, {
                    params: {
                        guest_name: this.query.guest_name
                    }
                }).then(resp => resp.data)

                this.reservations = reservations;
            },
            async cancel(reservation_id) {
                let resp = await fetch('/api/reservation/cancel', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reservation_id: reservation_id
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
            search() {
                this.query.page_number = 1;

                // add query to url
                const url = new URL(window.location)
                url.searchParams.set('guest_name', this.query.guest_name)
                window.history.pushState(null, '', url.toString())

                this.read()
            }
        },
        mounted() {
            if (this.query.guest_name) {
                this.read()
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 0;
    }
</style>