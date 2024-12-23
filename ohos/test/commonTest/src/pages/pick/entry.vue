<template>
<div>
    <div title='picker-event' class="pickBox">
        <div class="btn">
            <text type="info" value="showPicker" @click="pickDate">pickDate</text>
        </div>
        <div title='校验结果：' class="btn">
            <text style="font-size:30px">{{resultPickDate}}</text>
        </div>
    </div>
    <div title='picker-event' class="pickBox">
        <div class="btn">
            <text type="info" value="showPicker" @click="pick">pick</text>
        </div>
        <div title='校验结果：' class="btn">
            <text style="font-size:30px">{{resultPick}}</text>
        </div>
    </div>
    <div title='picker-event' class="pickBox">
        <div class="btn">
            <text type="info" value="showPicker" @click="pickTime">pickTime</text>
        </div>
        <div title='校验结果：' class="btn">
            <text style="font-size:30px">{{resultPickTime}}</text>
        </div>
    </div>
</div>
</template>

<script>
var picker = weex.requireModule("picker");
module.exports = {
    data: {
        resultPickDate: '',
        resultPick: '',
        resultPickTime: ''
    },
    components: {},
    methods: {
        pickDate() {
            var params = {
                'value': '2018-01-31',
                'max': '2020-01-31',
                'min': '2010-01-31',
            }
            picker.pickDate(params, (ret) => {
                if (ret.result == 'success') {
                    this.resultPickDate = ret.data;
                }
            });
        },
        pick() {
            let city = ['上海', '武汉', '北京', '深圳', '广州', '江西']
            let params = {
                'index': 1,
                'items': city
            }
            picker.pick(params, (res) => {
                if (res.result == 'success') {
                    this.resultPick = res.data;
                }
            })
        },
        pickTime() {
            let params = {
                'value': '09:38'
            }
            picker.pickTime(params, res => {
                if (res.result == 'success') {
                    this.resultPickTime = res.data;
                }
            })
        }
    }
}
</script>

<style scoped>
.pickBox {
    border-width: 1px;
    border-style: solid;
    border-color: blue;
    border-radius: 10px;
    width: 540px;
    /* justify-content: center; */
    align-items: center;
    padding: 20px;
    margin-top: 20px;
}

.btn {
    width: 500px;
    padding: 20px;
    margin: 20px auto 0;
    border-radius: 10px;
    color: #6d7dff;
    text-align: center;
    font-size: 32px;
    border-style: solid;
    border-color: #6d7dff;
    border-width: 1px;
}

.mr-base {
    margin: 10px;
    font-size: 25px;
}
</style>
