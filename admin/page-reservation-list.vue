<template>

    <div style="margin: 1em;">

        <!-- filter -->
        <el-card style="height:80px">
            <el-form :inline="true" @submit.native.prevent>
                <el-form-item>
                    <el-select v-model="query.status" placeholder="Status" clearable>
                        <el-option key="reserved" value="reserved"></el-option>
                        <el-option key="canceled" value="canceled"></el-option>
                        <el-option key="completed" value="completed"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="query.page_number = 1; read()">Search</el-button>
                </el-form-item>

                <!-- <el-form-item style="float:right">
                    <el-popover trigger="hover">
                        <el-link slot="reference" icon="el-icon-arrow-down" :underline="false" style="margin-left:5px"></el-link>
                    </el-popover>
                </el-form-item> -->
            </el-form>
        </el-card>

        <!-- table -->
        <el-card style="margin-top: 1em;">
            <el-table :data="table.list" v-loading="table.loading" stripe center style="min-height:60%">

                <el-table-column label="#" width="45" type="index"></el-table-column>

                <el-table-column label="Guest Name">
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row.guest_name }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="Arrival Time" prop="arrival_time" sortable>
                    <template slot-scope="scope">
                        <span v-if="scope.row.arrival_time">
                            {{ dayjs(Number(scope.row.arrival_time)).format('YY/M/D HH:mm') }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="Status">
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row.status }}</span>
                    </template>
                </el-table-column>

                <!-- action -->
                <el-table-column fixed="right" label="Action" width="280">
                    <template slot-scope="scope">
                        <el-tooltip content="Complete" placement="top">
                            <el-link icon="el-icon-check" :underline="false" @click.stop="complete(scope.row._id)">
                            </el-link>
                        </el-tooltip>
                        <el-tooltip content="Cancel" placement="top">
                            <el-link icon="el-icon-close" :underline="false" @click.stop="cancel(scope.row._id)">
                            </el-link>
                        </el-tooltip>
                        <el-tooltip content="View" placement="top">
                            <el-link icon="el-icon-view" :underline="false" :href="`reservation-detail?id=${scope.row._id}`">
                            </el-link>
                        </el-tooltip>
                        <el-tooltip content="Update" placement="top">
                            <el-link icon="el-icon-edit" :underline="false" :href="`/update?id=${scope.row._id}`">
                            </el-link>
                        </el-tooltip>
                        <el-tooltip content="Remove" placement="top">
                            <el-link icon="el-icon-delete" :underline="false" @click.stop="remove(scope.row)"></el-link>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                query: {
                    page_number: 1,
                    page_size: 10,
                    status: 'reserved',
                },
                table: {
                    list: [],
                    total: 0,
                    loading: false,
                }
            }
        },
        methods: {
            async read() {
                this.table.loading = true;

                // graphql
                const body = {
                    query: `
                        query {
                            reservations(condition:{status:"${this.query.status}"}) {
                                _id
                                guest_name
                                arrival_time
                                status
                            }
                        }
                    `
                }

                let reservations = await axios.post('/graphql', body).then(resp => resp.data.data.reservations)

                this.table.list = reservations;

                this.table.loading = false;
            },
            async cancel(reservation_id) {
                let resp = await axios.post('/api/reservation/cancel', {
                    reservation_id: reservation_id
                }).then(resp => resp.data)

                this.$message.success(resp.message)
                this.read()

            },
            async complete(reservation_id) {
                let resp = await axios.post('/api/reservation/complete', {
                    reservation_id: reservation_id
                }).then(resp => resp.data)

                this.$message.success(resp.message)
                this.read()

            },
            async remove(reservation) {
                this.$confirm(`Confirm to remove`, 'Remove')
                    .then(async () => {

                        await axios.delete(`/api/reservation/${reservation._id}`)
                            .then((resp) => resp.data)

                        this.read()

                        this.$notify.success({
                            title: `success`
                        })

                    })
                    .catch(e => {
                        if (e !== 'cancel') {
                            this.$notify.error({
                                title: `failed`,
                                message: e?.response?.data?.message || ''
                            })
                        }
                    })
            },
        },
        mounted() {
            this.read()
        }
    }
</script>