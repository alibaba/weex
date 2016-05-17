<template>
    <div style="overflow: hidden; flex-direction: row;" onappear="appeared" ondisappear="disappeared">
        <content></content>
    </div>
</template>

<style>
.wrap {
    overflow: hidden;
}
</style>

<script>
module.exports = {
    data: {
        now: 0,
        remain: 0,
        time: {
            elapse: 0,
            D: '0',
            DD: '0',
            h: '0',
            hh: '00',
            H: '0',
            HH: '0',
            m: '0',
            mm: '00',
            M: '0',
            MM: '0',
            s: '0',
            ss: '00',
            S: '0',
            SS: '0'
        },
        outofview: false
    },
    ready: function() {
        if (this.remain <= 0) {
            return;
        }
        // this.isWeb = this.$getConfig().env.platform === 'Web';
        this.now = Date.now();
        this.nextTick();
    },
    methods: {
        nextTick: function() {
            if (this.outofview) {
                setTimeout(this.nextTick.bind(this), 1000);
            } else {
                this.time.elapse = parseInt((Date.now() - this.now) / 1000);

                if (this.calc()) {
                    this.$emit('tick', Object.assign({}, this.time));
                    setTimeout(this.nextTick.bind(this), 1000);
                } else {
                    this.$emit('alarm', Object.assign({}, this.time));
                }
                this._app.updateActions(); 
            }
        },
        format: function(str) {
            if (str.length >= 2) {
                return str;
            } else {
                return '0' + str;
            }
        },
        calc: function() {
            var remain = this.remain - this.time.elapse;
            if (remain < 0) {
                remain = 0;
            }
            this.time.D = String(parseInt(remain / 86400));
            this.time.DD = this.format(this.time.D);
            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));
            this.time.hh = this.format(this.time.h);
            this.time.H = String(parseInt(remain / 3600));
            this.time.HH = this.format(this.time.H);
            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));
            this.time.mm = this.format(this.time.m);
            this.time.M = String(parseInt(remain / 60));
            this.time.MM = this.format(this.time.M);
            this.time.s = String(remain - parseInt(this.time.M) * 60);
            this.time.ss = this.format(this.time.s);
            this.time.S = String(remain);
            this.time.SS = this.format(this.time.S);
            // console.log(remain, this.D, this.h, this.hh, this.H, this.HH, this.m, this.MM, this.s, this.ss, this.S, this.SS);
            return remain > 0;
        },
        appeared: function() {
            this.outofview = false;
        },
        disappeared: function() {
            this.outofview = true;
        }
    }
}
</script>

