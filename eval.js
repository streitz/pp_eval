(function ($) {
    $(document).ready(function () {
        $(".tooltip").tooltip({
            showBody: " - ",
	    fade: 250
        })

        var data = {
            availability: 0,
            consistency: 0,
            ptolerance: 0,
            size: 0,
            growth: 0,
            frequency: 0,
            f_change: 0
        }

        var data_types = {
            relat: 0,
            trans: 0,
            mass: 0,
            bulk: 0,
            time: 0,
            hier: 0,
            graph: 0
        }

        var query_types = {
            id: 0,
            example: 0,
            relation: 0
        }

        var total = function (model) {
            var sum = 0;
            for(key in model) {
                sum += model[key];
            }
            if (sum == 0) {
                sum = 2;
            };
            return sum;
        }

        var update = function () {
            $("#relational-value").html(Math.floor(data_types.relat*100/total(data_types)));
            $("#transient-value").html(Math.floor(data_types.trans*100/total(data_types)));
            $("#mass-value").html(Math.floor(data_types.mass*100/total(data_types)));
            $("#bulk-value").html(Math.floor(data_types.bulk*100/total(data_types)));
            $("#time-value").html(Math.floor(data_types.time*100/total(data_types)));
            $("#hierarchical-value").html(Math.floor(data_types.hier*100/total(data_types)));
            $("#graph-value").html(Math.floor(data_types.graph*100/total(data_types)));

            $("#query_type_id-value").html(Math.floor(query_types.id*100/total(query_types)));
            $("#query_type_example-value").html(Math.floor(query_types.example*100/total(query_types)));
            $("#query_type_relationship-value").html(Math.floor(query_types.relation*100/total(query_types)));
        }

        var normalSlider = function (id, model, field) {
            $(id).slider({
                min:  0,
                step: 5,
                max:  100,
                value: model[field],
                slide:  function(event, ui) {
                    if (model[field] !== ui.value) {
                        model[field] = ui.value
                        update()
                    }
                }
            }) 
        }

        normalSlider('#slider-relational', data_types, 'relat')
        normalSlider('#slider-transient', data_types, 'trans')
        normalSlider('#slider-mass', data_types, 'mass')
        normalSlider('#slider-bulk', data_types, 'bulk')
        normalSlider('#slider-time', data_types, 'time')
        normalSlider('#slider-hierarchical', data_types, 'hier')
        normalSlider('#slider-graph', data_types, 'graph')

        normalSlider('#slider-query_type_id', query_types, 'id')
        normalSlider('#slider-query_type_example', query_types, 'example')
        normalSlider('#slider-query_type_relationship', query_types, 'relation')

        var labeledSlider = function (id, field, labels) {
            $(id).labeledslider({
                min:  0,
                max:  labels.length - 1,
                step: 1,
                tickInterval: 1,
                tickLabels: labels,
                slide:  function(event, ui) {
                    if (data[field] !== ui.value) {
                        data[field] = ui.value
                        update()
                    }
                } 
            })
        }

        var changes = ['none', 'marg', 'lin', 'poly', 'exp']
        var categories = ['not nec', 'not imp', 'no matter', 'imp', 'very imp']

        labeledSlider('#slider-availability', 'availability', categories)
        labeledSlider('#slider-consistency', 'consistency', categories)
        labeledSlider('#slider-ptolerance', 'ptolerance', categories)
        labeledSlider('#slider-data_sizing', 'size', ['kB', 'MB', 'GB', 'TB', 'PB'])
        labeledSlider('#slider-data_growth', 'growth', changes)
        labeledSlider('#slider-query_freq', 'frequency', ['<= 1', '10', '100', '1000', '10000', '>=100000'])
        labeledSlider('#slider-query_prediction', 'f_change', changes)

        update();
    });
})(jQuery);