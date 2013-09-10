(function ($) {
    $(document).ready(function () {
        // imported settings
        var settings;

        var data = {
            general: 1,
            investment: 2,
            innovation: 0,
            data: 1,
            data_sizing: 2,
            data_growth: 2,
            requirements: 1,
            availability: 2,
            consistency: 2,
            ptolerance: 1,
            data_type: 1,
            data_properties: 1,
            data_processing: 1,
            transaction: 2,
            query_type: 1
        }

        var data_structures = {
            relational: 50,
            hierarchical: 50,
            graph: 50,
            document: 50,
            kv: 50,
            binary: 50
        }


        var data_properties = {
            transient: 50,
            time: 50,
            bulk: 50,
            cold: 50,
            hot: 50
        }

        var query_type = {
            query_type_id: 50,
            query_type_example: 50,
            query_type_relationship: 50,
            query_type_fulltext: 50
        }


        var backup_data = {
            general: 0,
            investment: 0,
            innovation: 0,
            data: 0,
            data_sizing: 0,
            data_growth: 0,
            requirements: 0,
            availability: 0,
            consistency: 0,
            ptolerance: 0,
            data_type: 0,
            data_properties: 0,
            data_processing: 0,
            transaction: 0,
            query_type: 0
        }

        var backup_data_structures = {
            relational: 0,
            hierarchical: 0,
            graph: 0,
            document: 0,
            kv: 0,
            binary: 0
        }


        var backup_data_properties = {
            transient: 0,
            time: 0,
            bulk: 0,
            cold: 0,
            hot: 0
        }

        var backup_query_type = {
            query_type_id: 0,
            query_type_example: 0,
            query_type_relationship: 0,
            query_type_fulltext: 0
        }



        $(".tooltip").tooltip({
            showBody: " - ",
            fade: 250,
            tooltipClass: "custom-tooltip-styling",
            position: { my: "left center", at: "center", collision: "flipfit" }
        })


        $.get("data/settings.csv", function(data){
            settings = processData(data);
        })

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


        $('#settings_load').change(function (evt) {
            var files = evt.target.files;

            for (var i = 0, f; (f = files[i]); i++) {
                /* global FileReader: true */
                var reader = new FileReader()
                reader.onload = (function () {
                    return function (e) {
                        var content = e.target.result
                        settings = processData(content);
                    }
                })(f)

                reader.readAsText(f)
                $('#settings_load').val('')
            }
        })


        var checkGroup = function (classes) {
            if(_.contains(classes, 'data_structures'))
                return 'data_structures'
            if(_.contains(classes, 'data_properties'))
                return 'data_properties'
            if(_.contains(classes, 'query_type'))
                return 'query_type'
        }


        var changeSliderStatus = function (target) {
            var name = target.id.replace(/checkbox-/, '')
            var classes = target.className

            if (_.contains(classes, 'simple')) {
                var group = checkGroup(classes)

                if(target.checked) {
                    $('#slider-' + name).slider('disable')
                    // TODO: change value to 0
                    eval('backup_' + group)[name] = eval(group)[name]
                    eval(group)[name] = 0
                    update()
                    $('#' + name + '-value').fadeTo(0,0.2)

                }
                else {
                    $('#slider-' + name).slider('enable')
                    eval(group)[name] = eval('backup_' + group)[name]
                    update()
                    $('#' + name + '-value').fadeTo(0,1.0)
                }
            } else {
                if(target.checked) {
                    $('#slider-' + name).labeledslider('disable')
                    backup_data[name] = data[name]
                    data[name] = -1
                }
                else {
                    $('#slider-' + name).labeledslider('enable')
                    data[name] = backup_data[name]
                }
            }
            
        }

        var data_types_off = false
        var data_properties_off = false
        var query_type_off = false

        $('input:checkbox').change(function (){
            changeSliderStatus(this)

            // group: general
            var inv = $('#slider-investment').labeledslider('option').disabled
            var inno = $('#slider-innovation').labeledslider('option').disabled
            if(inv && inno)
                $('#slider-general').labeledslider('disable')
            else
                $('#slider-general').labeledslider('enable')

            // group: data
            var size = $('#slider-data_sizing').labeledslider('option').disabled
            var growth = $('#slider-data_growth').labeledslider('option').disabled
            if(size && growth)
                $('#slider-data').labeledslider('disable')
            else
                $('#slider-data').labeledslider('enable')            

            // group: data processing
            var transaction = $('#slider-transaction').labeledslider('option').disabled
            if (transaction)
                $('#slider-data_processing').labeledslider('disable')
            else
                $('#slider-data_processing').labeledslider('enable')

            // group: requirements
            var a = $('#slider-availability').labeledslider('option').disabled
            var c = $('#slider-consistency').labeledslider('option').disabled
            var p = $('#slider-ptolerance').labeledslider('option').disabled
            if(c && a && p)
                $('#slider-requirements').labeledslider('disable')
            else
                $('#slider-requirements').labeledslider('enable')

            // group: data structure types
            var rel = $('#slider-relational').slider('option').disabled
            var hier = $('#slider-hierarchical').slider('option').disabled
            var graph = $('#slider-graph').slider('option').disabled
            var kv = $('#slider-kv').slider('option').disabled
            var doc = $('#slider-document').slider('option').disabled
            var bin = $('#slider-binary').slider('option').disabled

            if(rel && hier && graph && kv && doc && bin) {
                $('#slider-data_type').labeledslider('disable')
                data_types_off = true
            } else {
                $('#slider-data_type').labeledslider('enable')
                data_types_off = false
            }


            // group: data properties
            var trans = $('#slider-transient').slider('option').disabled
            var time = $('#slider-time').slider('option').disabled
            var bulk = $('#slider-bulk').slider('option').disabled
            var cold = $('#slider-cold').slider('option').disabled
            var hot = $('#slider-hot').slider('option').disabled

            if(trans && time && bulk && cold && hot) {
                $('#slider-data_properties').labeledslider('disable')
                data_properties_off = true
            } else {
                $('#slider-data_properties').labeledslider('enable')
                data_properties_off = false
            }



            // group: query types
            var id = $('#slider-query_type_id').slider('option').disabled
            var ex = $('#slider-query_type_example').slider('option').disabled
            var rela = $('#slider-query_type_relationship').slider('option').disabled
            var ft = $('#slider-query_type_fulltext').slider('option').disabled

            if(id && ex && rela && ft) {
                $('#slider-query_types').labeledslider('disable')
                query_type_off = true
            } else {
                $('#slider-query_types').labeledslider('enable')
                query_type_off = false
            }


            update()

        });


        var update = function () {
            var p_relat = { value: Math.round(data_structures.relational*100/total(data_structures)) }
            var p_graph = { value: Math.round(data_structures.graph*100/total(data_structures)) }
            var p_hierarchical = { value: Math.round(data_structures.hierarchical*100/total(data_structures)) }
            var p_doc = { value: Math.round(data_structures.document*100/total(data_structures)) }
            var p_kv = { value: Math.round(data_structures.kv*100/total(data_structures)) }
            var p_bin = { value: Math.round(data_structures.binary*100/total(data_structures)) }

            var p_total1 = p_relat.value + p_graph.value + p_hierarchical.value + p_doc.value + p_kv.value + p_bin.value;

            var maximum1 = _.max([p_relat, p_graph, p_hierarchical, p_doc, p_kv, p_bin], function (item) { return item.value })

            maximum1.value += 100 - p_total1

            if (!data_types_off) {
                $("#relational-value").html(p_relat.value);
                $("#graph-value").html(p_graph.value);
                $("#hierarchical-value").html(p_hierarchical.value);
                $("#document-value").html(p_doc.value);
                $("#kv-value").html(p_kv.value);
                $("#binary-value").html(p_bin.value);
            } else {
                $("#relational-value").html(0);
                $("#graph-value").html(0);
                $("#hierarchical-value").html(0);
                $("#document-value").html(0);
                $("#kv-value").html(0);
                $("#binary-value").html(0);
            }

            var p_transient = { value: Math.round(data_properties.transient*100/total(data_properties)) }
            var p_bulk = { value: Math.round(data_properties.bulk*100/total(data_properties)) }
            var p_time = { value: Math.round(data_properties.time*100/total(data_properties)) }
            var p_hot = { value: Math.round(data_properties.hot*100/total(data_properties)) }
            var p_cold = { value: Math.round(data_properties.cold*100/total(data_properties)) }

            var p_total2 = p_transient.value + p_bulk.value + p_time.value + p_hot.value + p_cold.value;

            var maximum2 = _.max([p_transient, p_bulk, p_time, p_cold, p_hot], function (item) { return item.value })
            
            maximum2.value += 100 - p_total2


            if (!data_properties_off) {
                $("#transient-value").html(p_transient.value);
                $("#bulk-value").html(p_bulk.value);
                $("#time-value").html(p_time.value);
                $("#hot-value").html(p_hot.value);
                $("#cold-value").html(p_cold.value);
            } else {
                $("#transient-value").html(0);
                $("#bulk-value").html(0);
                $("#time-value").html(0);
                $("#hot-value").html(0);
                $("#cold-value").html(0);
            }

            var p_id = { value: Math.round(query_type.query_type_id*100/total(query_type)) }
            var p_example = { value: Math.round(query_type.query_type_example*100/total(query_type)) }
            var p_relation = { value: Math.round(query_type.query_type_relationship*100/total(query_type)) }
            var p_fulltext = { value: Math.round(query_type.query_type_fulltext*100/total(query_type)) }

            var p_total3 = p_id.value + p_example.value + p_relation.value + p_fulltext.value;

            var maximum3 = _.max([p_id, p_example, p_relation, p_fulltext], function (item) { return item.value })
            
            maximum3.value += 100 - p_total3


            if (!query_type_off) {
                $("#query_type_id-value").html(p_id.value);
                $("#query_type_example-value").html(p_example.value);
                $("#query_type_relationship-value").html(p_relation.value);
                $("#query_type_fulltext-value").html(p_fulltext.value);
            } else {
                $("#query_type_id-value").html(0);
                $("#query_type_example-value").html(0);
                $("#query_type_relationship-value").html(0);
                $("#query_type_fulltext-value").html(0);
            }
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

        // category: data structure types
        normalSlider('#slider-relational', data_structures, 'relational')
        normalSlider('#slider-hierarchical', data_structures, 'hierarchical')
        normalSlider('#slider-graph', data_structures, 'graph')
        normalSlider('#slider-kv', data_structures, 'kv')
        normalSlider('#slider-document', data_structures, 'document')
        normalSlider('#slider-binary', data_structures, 'binary')

        // category: data properties
        normalSlider('#slider-transient', data_properties, 'transient')
        normalSlider('#slider-cold', data_properties, 'cold')
        normalSlider('#slider-hot', data_properties, 'hot')
        normalSlider('#slider-bulk', data_properties, 'bulk')
        normalSlider('#slider-time', data_properties, 'time')

        // category: query types
        normalSlider('#slider-query_type_id', query_type, 'query_type_id')
        normalSlider('#slider-query_type_example', query_type, 'query_type_example')
        normalSlider('#slider-query_type_relationship', query_type, 'query_type_relationship')
        normalSlider('#slider-query_type_fulltext', query_type, 'query_type_fulltext')

        var labeledSlider = function (id, field, labels, tooltips) {
            $(id).labeledslider({
                min:  0,
                max:  labels.length - 1,
                step: 1,
                tickInterval: 1,
                tickLabels: labels,
                tickTooltips: tooltips,
                slide:  function(event, ui) {
                    if (data[field] !== ui.value) {
                        data[field] = ui.value
                    }
                }
            })
            $(id).labeledslider('value',data[field])
        }

        // labels
        var changes = ['none', 'marg', 'lin', 'poly', 'exp']
        var categories = ['not necessary', 'optional', 'important']
        var categories2 = ['low', 'medium', 'high']
        var categories3 = ['none', 'low', 'medium', 'high', 'no limit']

        // tooltips
        var tooltip1 = ['none', 'marginal', 'linear', 'polynomial', 'exponential']

        // category: requirements
        labeledSlider('#slider-availability', 'availability', categories)
        labeledSlider('#slider-consistency', 'consistency', categories)
        labeledSlider('#slider-ptolerance', 'ptolerance', categories)

        // category: data
        labeledSlider('#slider-data_sizing', 'data_sizing', ['&le;100 MB', '&le;1 GB', '&le;10 GB', '&le;100 GB', '&le;1 TB', '>1 TB'])
        labeledSlider('#slider-data_growth', 'data_growth', changes, tooltip1)

        // category: data processing
        labeledSlider('#slider-transaction', 'transaction', ['0%', '25%', '50%', '75%', '100%'])

        // category: general
        labeledSlider('#slider-innovation', 'innovation', categories2)
        labeledSlider('#slider-investment', 'investment', categories3)

        // categories
        labeledSlider('#slider-general', 'general', categories2)
        labeledSlider('#slider-requirements', 'requirements', categories2)
        labeledSlider('#slider-data', 'data', categories2)
        labeledSlider('#slider-data_type', 'data_type', categories2)
        labeledSlider('#slider-data_properties', 'data_properties', categories2)
        labeledSlider('#slider-data_processing', 'data_processing', categories2)
        labeledSlider('#slider-query_types', 'query_type', categories2)

        update()
    });


    function processData(content) {
        var contentLines = content.split(/\r\n|\n/);
        var lines = [];

        for (var i=0; i<contentLines.length; i++) {
            var data = contentLines[i].split(';');
            lines.push(data);
        }

        return lines;
    }


    $(document).on('click', '#import', function() {
        $('#settings_load').trigger('click');
    });


})(jQuery);