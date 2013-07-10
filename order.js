
(function ($) {
    $(document).ready(function () {
        $(".tooltip").tooltip({
            showBody: " - ",
	    fade: 250
        });

        var pricing_ini = {
            msa: 3*65,
            xt: 7*75,
            network: { intranet_mobile: 0, intranet: 0 }
        };
        var pricing_mon = {
            cpu: 25,
            ram: 6,
            hd:  0.45,
            sc:  { D: 34, C: 45, B: 68, A: 91 },
            network: { intranet_mobile: 0, intranet: 0 },
            msa: 65,
            xt:  75
        };
        var model = {
            cpu: 1,
            ram: 2,
            hd: 50,
            sc: "C",
            network: "intranet",
            price_ini: 0,
            price_mon: 0
        };
        var constraint_cpu2ram_map = {
            1: [ 2,   4 ],
            2: [ 8,  12 ],
            4: [ 16, 24 ]
        };
        var constraint_cpu2ram = function (ram, cpu) {
            var min = constraint_cpu2ram_map[cpu][0];
            var max = constraint_cpu2ram_map[cpu][1];
            if (ram < min)
                ram = min;
            else if (max < ram)
                ram = max;
            return ram;
        };
        var constraint_ram2cpu = function (cpu, ram) {
            for (var key in constraint_cpu2ram_map) {
                var range = constraint_cpu2ram_map[key];
                var min = range[0];
                var max = range[1];
                if (min <= ram && ram <= max)
                    return parseInt(key);
            }
            return cpu;
        };
        var list_cpu = [ 1, 2, 4 ];
        var list_ram = [ 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
        var idx2val = function (a, idx) {
            return a[idx];
        }
        var val2idx = function (a, val) {
            for (var idx = 0; idx < a.length; idx++) {
                if (a[idx] === val)
                    return idx;
            }
            return 0;
        }
        var update = function () {
            $("#cpu-value").html(model.cpu);
            $("#ram-value").html(model.ram);
            $("#hd-value").html(model.hd);
            $("#sc-value").html(model.sc);

            var price_ini = pricing_ini.msa + pricing_ini.xt;
            price_ini += pricing_ini.network[model.network];

            var price_mon = pricing_mon.msa + pricing_mon.xt;
            price_mon += pricing_mon.cpu * model.cpu;
            price_mon += pricing_mon.ram * model.ram;
            price_mon += pricing_mon.hd * model.hd;
            price_mon += pricing_mon.hd * (model.ram * 2 /* swap */ + 15 /* OS */);
            price_mon += pricing_mon.sc[model.sc];
            price_mon = Math.ceil(price_mon);
            price_mon += pricing_mon.network[model.network];

            model.price_ini = price_ini;
            model.price_mon = price_mon;

            $("#price_ini .price_value").html(price_ini + "&nbsp;&euro;");
            $("#price_mon .price_value").html(price_mon + "&nbsp;&euro;");
        };
        var button_toggle = function () {
            var i1 = $("#input-projekt").val();
            var i2 = $("#input-kostenstelle").val();
            var i3 = $("#input-contact1").val();
            var i4 = $("#input-contact2").val();
            if (i1 != "" && i2 != "" && i3 != "" && i4 != "")
                 $("#submit").removeAttr("disabled");
            else
                 $("#submit").attr("disabled", "disabled");
        };
        $("#formular").submit(function () {
            $('#formular input[name="user"]').val($("#input-user").val());
            $('#formular input[name="projekt"]').val($("#input-projekt").val());
            $('#formular input[name="kostenstelle"]').val($("#input-kostenstelle").val());
            $('#formular input[name="contact1"]').val($("#input-contact1").val());
            $('#formular input[name="contact2"]').val($("#input-contact2").val());
            $('#formular input[name="cpu"]').val(model.cpu);
            $('#formular input[name="ram"]').val(model.ram);
            $('#formular input[name="hd"]').val(model.hd);
            $('#formular input[name="sc"]').val(model.sc);
            $('#formular input[name="network"]').val(model.network);
            $('#formular input[name="price_ini"]').val(model.price_ini);
            $('#formular input[name="price_mon"]').val(model.price_mon);
            return true;
        });
        $('.input').change(function () {
            button_toggle();
        });
        $('.input').keyup(function () {
            button_toggle();
        });
        $('#slider-cpu').slider({
            min:  1,
            step: 1,
            max:  list_cpu.length,
            value: val2idx(list_cpu, model.cpu) + 1,
            animate: true,
            change: function(event, ui) {
                model.cpu = idx2val(list_cpu, ui.value - 1);
                var ram = constraint_cpu2ram(model.ram, model.cpu);
                if (model.ram !== ram) {
                    model.ram = ram;
                    $('#slider-ram').slider("value", val2idx(list_ram, model.ram) + 1);
                }
                update();
            }
        });
        $('#slider-ram').slider({
            min:  1,
            step: 1,
            max:  list_ram.length,
            value: val2idx(list_ram, model.ram) + 1,
            animate: true,
            change: function(event, ui) {
                model.ram = idx2val(list_ram, ui.value - 1);
                var cpu = constraint_ram2cpu(model.cpu, model.ram);
                if (model.cpu !== cpu) {
                    model.cpu = cpu;
                    $('#slider-cpu').slider("value", val2idx(list_cpu, model.cpu) + 1);
                }
                update();
            }
        });
        $('#slider-hd').slider({
            min:  10,
            step: 10,
            max:  400,
            value: model.hd,
            animate: true,
            change: function(event, ui) {
                model.hd = ui.value;
                update();
            }
        });
        $('#slider-sc').slider({
            min:  1,
            step: 1,
            max:  3,
            value: { "D": 1, "C": 2, "B": 3 }[model.sc],
            animate: true,
            change: function(event, ui) {
                model.sc = { 1: "D", 2: "C", 3: "B" }[ui.value],
                update();
            }
        });
        $('select.network').change(function () {
	    model.network = $('select.network').val();
	    update();
        });
        update();
    });
})(jQuery);

