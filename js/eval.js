(function ($) {
    $(document).ready(function () {
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

        var unknown = {
            general: 1,
            investment: 0,
            innovation: 1,
            data: 1,
            data_sizing: 2,
            data_growth: 2,
            requirements: 1,
            availability: 1,
            consistency: 1,
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

        var advice = {
            final: 0,
            general: 0,
            data: 0,
            requirements: 0,
            data_processing: 0,
            data_types: 0,
            data_properties: 0,
            query_types: 0
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


        $('#lang_en').on('click', function() {
            changeLanguage('en')
            $("#data_processing")[0].style.marginTop='15px'
            $("#data_type")[0].style.marginTop='7px'
            $("#data_properties")[0].style.marginTop='15px'
            $("#query_types")[0].style.marginTop='15px'
        });

        $('#lang_de').on('click', function() {
            changeLanguage('de')
            $("#data_processing")[0].style.marginTop='7px'
            $("#data_type")[0].style.marginTop='15px'            
            $("#data_properties")[0].style.marginTop='7px'
            $("#query_types")[0].style.marginTop='7px'
        });

        var changeLanguage = function (lang) {
            i18n.setLng(lang, function (){
                updateLanguage()
            })

        }

        var updateLanguage = function () {
            $('[data-i18n]').i18n()
        }

        i18n.init({ resGetPath: 'locale/__lng__.json' , lng: 'en', fallbackLng: 'en', preload: ['de']}, function() {
            updateLanguage()
        });
        
        $('[data-toggle="tooltip"]').tooltip()

        var total = function (model) {
            var sum = 0;
            for(var key in model) {
                sum += model[key];
            }
            if (sum === 0) {
                sum = 2;
            }
            return sum;
        }

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
                    eval('backup_' + group)[name] = eval(group)[name]
                    eval(group)[name] = 0
                }
                else {
                    $('#slider-' + name).slider('enable')
                    eval(group)[name] = eval('backup_' + group)[name]
                }
            } else {
                if(target.checked) {
                    $('#slider-' + name).labeledslider('disable')
                    backup_data[name] = data[name]
                    data[name] = unknown[name]
                }
                else {
                    $('#slider-' + name).labeledslider('enable')
                    data[name] = backup_data[name]
                }
            }
          
          update()
        }

        var data_types_off = false
        var data_properties_off = false
        var query_type_off = false

        // inicates whether the group was backuped in the previous step or not
        var backuped = {
            general: false,
            data: false,
            requirements: false,
            data_type: false,
            data_properties: false,
            data_processing: false,
            query_types: false
        }

        $('input:checkbox').change(function (){
            changeSliderStatus(this)

            // group: general
            var inv = $('#slider-investment').labeledslider('option').disabled
            var inno = $('#slider-innovation').labeledslider('option').disabled
            if(inv && inno) {
                $('#slider-general').labeledslider('disable')
                $('#icon-general').css('opacity', '0.125')
                $('#icon-general').css('color', 'black')
                backup_data.general = data.general
                data.general = unknown.general
                backuped.general = true
            } else if (backuped.general) {
                $('#slider-general').labeledslider('enable');
                $('#icon-general').css('opacity', '0.7')
                data.general = backup_data.general
                backuped.general = false
            }

            // group: data
            var size = $('#slider-data_sizing').labeledslider('option').disabled
            var growth = $('#slider-data_growth').labeledslider('option').disabled
            if(size && growth) {
                $('#slider-data').labeledslider('disable')
                $('#icon-data').css('opacity', '0.125')
                $('#icon-data').css('color', 'black')
                backup_data.data = data.data
                data.data = unknown.data
                backuped.data = true
            } else if (backuped.data) {
                $('#slider-data').labeledslider('enable')
                $('#icon-data').css('opacity', '0.7')
                data.data = backup_data.data
                backuped.data = false
            }

            // group: data processing
            var transaction = $('#slider-transaction').labeledslider('option').disabled
            if (transaction) {
                $('#slider-data_processing').labeledslider('disable')
                $('#icon-data_processing').css('opacity', '0.125')
                $('#icon-data_processing').css('color', 'black')
                backup_data.data_processing = data.data_processing
                data.data_processing = unknown.data_processing
                backuped.data_processing = true
            } else if (backuped.data_processing) {
                $('#slider-data_processing').labeledslider('enable')
                $('#icon-data_processing').css('opacity', '0.7')
                data.data_processing = backup_data.data_processing
                backuped.data_processing = false
            }

            // group: requirements
            var a = $('#slider-availability').labeledslider('option').disabled
            var c = $('#slider-consistency').labeledslider('option').disabled
            var p = $('#slider-ptolerance').labeledslider('option').disabled
            if(c && a && p) {
                $('#slider-requirements').labeledslider('disable')
                $('#icon-requirements').css('opacity', '0.125')
                $('#icon-requirements').css('color', 'black')
                backup_data.requirements = data.requirements
                data.requirements = unknown.requirements
                backuped.requirements = true
            } else if (backuped.requirements) {
                $('#slider-requirements').labeledslider('enable')
                $('#icon-requirements').css('opacity', '0.7')
                data.requirements = backup_data.requirements
                backuped.requirements = false
            }

            // group: data structure types
            var rel = $('#slider-relational').slider('option').disabled
            var hier = $('#slider-hierarchical').slider('option').disabled
            var graph = $('#slider-graph').slider('option').disabled
            var kv = $('#slider-kv').slider('option').disabled
            var doc = $('#slider-document').slider('option').disabled
            var bin = $('#slider-binary').slider('option').disabled

            if(rel && hier && graph && kv && doc && bin) {
                $('#slider-data_type').labeledslider('disable')
                $('#icon-data_type').css('opacity', '0.125')
                $('#icon-data_type').css('color', 'black')
                data_types_off = true
                backup_data.data_type = data.data_type
                data.data_type = unknown.data_type
                backuped.data_type = true
            } else if (backuped.data_type) {
                $('#slider-data_type').labeledslider('enable')
                $('#icon-data_type').css('opacity', '0.7')
                data_types_off = false
                data.data_type = backup_data.data_type
                backuped.data_type = false
            }


            // group: data properties
            var trans = $('#slider-transient').slider('option').disabled
            var time = $('#slider-time').slider('option').disabled
            var bulk = $('#slider-bulk').slider('option').disabled
            var cold = $('#slider-cold').slider('option').disabled
            var hot = $('#slider-hot').slider('option').disabled

            if(trans && time && bulk && cold && hot) {
                $('#slider-data_properties').labeledslider('disable')
                $('#icon-data_properties').css('opacity', '0.125')
                $('#icon-data_properties').css('color', 'black')
                data_properties_off = true
                backup_data.data_properties = data.data_properties
                data.data_properties = unknown.data_properties
                backuped.data_properties = true
            } else if (backuped.data_properties) {
                $('#slider-data_properties').labeledslider('enable')
                $('#icon-data_properties').css('opacity', '0.7')
                data_properties_off = false
                data.data_properties = backup_data.data_properties
                backuped.data_properties = false
            }


            // group: query types
            var id = $('#slider-query_type_id').slider('option').disabled
            var ex = $('#slider-query_type_example').slider('option').disabled
            var rela = $('#slider-query_type_relationship').slider('option').disabled
            var ft = $('#slider-query_type_fulltext').slider('option').disabled

            if(id && ex && rela && ft) {
                $('#slider-query_types').labeledslider('disable')
                $('#icon-query_types').css('opacity', '0.125')
                $('#icon-query_types').css('color', 'black')
                query_type_off = true
                backup_data.query_type = data.query_type
                data.query_type = unknown.query_type
                backuped.query_types = true
            } else if (backuped.query_types) {
                $('#slider-query_types').labeledslider('enable')
                $('#icon-query_types').css('opacity', '0.7')
                query_type_off = false
                data.query_type = backup_data.query_type
                backuped.query_types = false
            }


            update()

        });


        var getColor = function (value) {
            var color = ''

            if (value > 0.5)
                color = 'rgba(' + Math.round((0.5 - (value - 0.5)) * 2 * 255) + ',255,0,1.0)'
            else
                color = 'rgba(255,' + Math.round(value * 2 * 255) + ',0,1.0)'

            return color
        }


        var calcAdvice = function () {
            var sumWeight = 0.5 * Math.pow(2, data.general) + 0.5 * Math.pow(2, data.data) + 0.5 * Math.pow(2, data.requirements) + 0.5 * Math.pow(2, data.data_processing) + 0.5 * Math.pow(2, data.data_type) + 0.5 * Math.pow(2, data.data_properties) + 0.5 * Math.pow(2, data.query_type);

            var color = ''

            advice.general = 0.5 * Math.pow(2, data.innovation) * (1.0 - data.investment * 0.2) / 2

            if(!($('#slider-general').labeledslider('option').disabled)){
                color = getColor(advice.general)
                $('#icon-general').css('color', color)
            }


            advice.data = (data.data_sizing + 1) * (data.data_growth + 1) / 30

            if(!($('#slider-data').labeledslider('option').disabled)){
                color = getColor(advice.data)
                $('#icon-data').css('color', color)
            }


            var sum = data.availability + data.consistency + data.ptolerance
            if (sum > 5)
                advice.requirements = 1
            else if (sum > 4)
                advice.requirements = 0.5
            else
                advice.requirements = 0

            if(!($('#slider-requirements').labeledslider('option').disabled)){
                color = getColor(advice.requirements)
                $('#icon-requirements').css('color', color)
            }


            advice.data_processing = 1/ Math.pow(2, data.transaction)

            if(!($('#slider-data_processing').labeledslider('option').disabled)){
                color = getColor(advice.data_processing)
                $('#icon-data_processing').css('color', color)
            }


            if(!($('#slider-data_type').labeledslider('option').disabled)){
                color = getColor(advice.data_types)
                $('#icon-data_type').css('color', color)
            }


            if(!($('#slider-data_properties').labeledslider('option').disabled)){
                color = getColor(advice.data_properties)
                $('#icon-data_properties').css('color', color)
            }


            if(!($('#slider-query_types').labeledslider('option').disabled)){
                color = getColor(advice.query_types)
                $('#icon-query_types').css('color', color)
            }


            var weightGeneral = advice.general * 0.5 * Math.pow(2, data.general)
            var weightData = advice.data * 0.5 * Math.pow(2, data.data)
            var weightRequirements = advice.requirements * 0.5 * Math.pow(2, data.requirements)
            var weightDataProcessing = advice.data_processing * 0.5 * Math.pow(2, data.data_processing)
            var weightQueryType = advice.query_types * 0.5 * Math.pow(2, data.query_type)
            var weightDataProperties = advice.data_properties * 0.5 * Math.pow(2, data.data_properties)
            var weightDataType = advice.data_types * 0.5 * Math.pow(2, data.data_type)


            advice.final = (weightGeneral + weightData + weightRequirements + weightDataProcessing + weightQueryType + weightDataProperties + weightDataType) / sumWeight;

            
            color = getColor(advice.final)

            var width = advice.final * 100 + '%'
            
            $('#recommendation').css('width', width)
            $('#recommendation').css('background-color', color)
            $('#thumb-up').css('font-size', 1 + advice.final + 'em')
            $('#thumb-down').css('font-size', 2 - advice.final + 'em')


        }



        var update = function () {
            var p_relat = { value: Math.round(data_structures.relational*100/total(data_structures)) }
            var p_graph = { value: Math.round(data_structures.graph*100/total(data_structures)) }
            var p_hierarchical = { value: Math.round(data_structures.hierarchical*100/total(data_structures)) }
            var p_doc = { value: Math.round(data_structures.document*100/total(data_structures)) }
            var p_kv = { value: Math.round(data_structures.kv*100/total(data_structures)) }
            var p_bin = { value: Math.round(data_structures.binary*100/total(data_structures)) }

            var p_total1 = p_relat.value + p_graph.value + p_hierarchical.value + p_doc.value + p_kv.value + p_bin.value

            var maximum1 = _.max([p_relat, p_graph, p_hierarchical, p_doc, p_kv, p_bin], function (item) { return item.value })

            maximum1.value += 100 - p_total1

            var avg1 = ((100 - maximum1.value) / maximum1.value) / (17/3)
            advice.data_types = avg1
            $('#data_type-avg').html(avg1)


            if (!data_types_off) {
                $('#relational-value').html(p_relat.value);
                $('#graph-value').html(p_graph.value);
                $('#hierarchical-value').html(p_hierarchical.value);
                $('#document-value').html(p_doc.value);
                $('#kv-value').html(p_kv.value);
                $('#binary-value').html(p_bin.value);
            } else {
                $('#relational-value').html(0);
                $('#graph-value').html(0);
                $('#hierarchical-value').html(0);
                $('#document-value').html(0);
                $('#kv-value').html(0);
                $('#binary-value').html(0);
            }

            var p_transient = { value: Math.round(data_properties.transient*100/total(data_properties)) }
            var p_bulk = { value: Math.round(data_properties.bulk*100/total(data_properties)) }
            var p_time = { value: Math.round(data_properties.time*100/total(data_properties)) }
            var p_hot = { value: Math.round(data_properties.hot*100/total(data_properties)) }
            var p_cold = { value: Math.round(data_properties.cold*100/total(data_properties)) }

            var p_total2 = p_transient.value + p_bulk.value + p_time.value + p_hot.value + p_cold.value;

            var maximum2 = _.max([p_transient, p_bulk, p_time, p_cold, p_hot], function (item) { return item.value })

            maximum2.value += 100 - p_total2

            var avg2 = ((100 - maximum2.value) / maximum2.value) / 4
            advice.data_properties = avg2
            $('#data_properties-avg').html(avg2);


            if (!data_properties_off) {
                $('#transient-value').html(p_transient.value);
                $('#bulk-value').html(p_bulk.value);
                $('#time-value').html(p_time.value);
                $('#hot-value').html(p_hot.value);
                $('#cold-value').html(p_cold.value);
            } else {
                $('#transient-value').html(0);
                $('#bulk-value').html(0);
                $('#time-value').html(0);
                $('#hot-value').html(0);
                $('#cold-value').html(0);
            }

            var p_id = { value: Math.round(query_type.query_type_id*100/total(query_type)) }
            var p_example = { value: Math.round(query_type.query_type_example*100/total(query_type)) }
            var p_relation = { value: Math.round(query_type.query_type_relationship*100/total(query_type)) }
            var p_fulltext = { value: Math.round(query_type.query_type_fulltext*100/total(query_type)) }

            var p_total3 = p_id.value + p_example.value + p_relation.value + p_fulltext.value;

            var maximum3 = _.max([p_id, p_example, p_relation, p_fulltext], function (item) { return item.value })

            maximum3.value += 100 - p_total3

            var avg3 = ((100 - maximum3.value) / maximum3.value) / 3
            advice.query_types = avg3
            $('#query_types-avg').html(avg3);



            if (!query_type_off) {
                $('#query_type_id-value').html(p_id.value);
                $('#query_type_example-value').html(p_example.value);
                $('#query_type_relationship-value').html(p_relation.value);
                $('#query_type_fulltext-value').html(p_fulltext.value);
            } else {
                $('#query_type_id-value').html(0);
                $('#query_type_example-value').html(0);
                $('#query_type_relationship-value').html(0);
                $('#query_type_fulltext-value').html(0);
            }

            calcAdvice()
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
                        update()
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
        $('span', $('#slider-availability-div')).last().css('margin-left', '-50px')
        labeledSlider('#slider-consistency', 'consistency', categories)
        $('span', $('#slider-consistency-div')).last().css('margin-left', '-50px')
        labeledSlider('#slider-ptolerance', 'ptolerance', categories)
        $('span', $('#slider-ptolerance-div')).last().css('margin-left', '-50px')

        // category: data
        labeledSlider('#slider-data_sizing', 'data_sizing', ['&le;100 MB', '&le;1 GB', '&le;10 GB', '&le;100 GB', '&le;1 TB', '>1 TB'])
        labeledSlider('#slider-data_growth', 'data_growth', changes, tooltip1)

        // category: data processing
        labeledSlider('#slider-transaction', 'transaction', ['0%', '25%', '50%', '75%', '100%'])

        // category: general
        labeledSlider('#slider-innovation', 'innovation', categories2)
        labeledSlider('#slider-investment', 'investment', categories3)
        $('span', $('#slider-investment-div')).last().css('margin-left', '-40px')

        // categories
        labeledSlider('#slider-general', 'general', categories2)
        $('span', $('#slider-general-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-general-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-requirements', 'requirements', categories2)
        $('span', $('#slider-requirements-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-requirements-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-data', 'data', categories2)
        $('span', $('#slider-data-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-data-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-data_type', 'data_type', categories2)
        $('span', $('#slider-data_type-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-data_type-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-data_properties', 'data_properties', categories2)
        $('span', $('#slider-data_properties-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-data_properties-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-data_processing', 'data_processing', categories2)
        $('span', $('#slider-data_processing-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-data_processing-div')).last().css('margin-left', '-35px')
        
        labeledSlider('#slider-query_types', 'query_type', categories2)
        $('span', $('#slider-query_types-div')).first().css('margin-right', '-25px')
        $('span', $('#slider-query_types-div')).last().css('margin-left', '-35px')

        var timer = null
        $(window).resize(function () {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                $('#slider-availability').labeledslider('destroy')
                labeledSlider('#slider-availability', 'availability', categories)
                $('#slider-consistency').labeledslider('destroy')
                labeledSlider('#slider-consistency', 'consistency', categories)
                $('#slider-ptolerance').labeledslider('destroy')
                labeledSlider('#slider-ptolerance', 'ptolerance', categories)
                $('#slider-data_sizing').labeledslider('destroy')
                labeledSlider('#slider-data_sizing', 'data_sizing', ['&le;100 MB', '&le;1 GB', '&le;10 GB', '&le;100 GB', '&le;1 TB', '>1 TB'])
                $('#slider-data_growth').labeledslider('destroy')
                labeledSlider('#slider-data_growth', 'data_growth', changes, tooltip1)
                $('#slider-transaction').labeledslider('destroy')
                labeledSlider('#slider-transaction', 'transaction', ['0%', '25%', '50%', '75%', '100%'])
                $('#slider-innovation').labeledslider('destroy')
                labeledSlider('#slider-innovation', 'innovation', categories2)
                $('#slider-investment').labeledslider('destroy')
                labeledSlider('#slider-investment', 'investment', categories3)
                $('#slider-general').labeledslider('destroy')
                labeledSlider('#slider-general', 'general', categories2)
                $('#slider-requirements').labeledslider('destroy')
                labeledSlider('#slider-requirements', 'requirements', categories2)
                $('#slider-data').labeledslider('destroy')
                labeledSlider('#slider-data', 'data', categories2)
                $('#slider-data_type').labeledslider('destroy')
                labeledSlider('#slider-data_type', 'data_type', categories2)
                $('#slider-data_properties').labeledslider('destroy')
                labeledSlider('#slider-data_properties', 'data_properties', categories2)
                $('#slider-data_processing').labeledslider('destroy')
                labeledSlider('#slider-data_processing', 'data_processing', categories2)
                $('#slider-query_types').labeledslider('destroy')
                labeledSlider('#slider-query_types', 'query_type', categories2)
            }, 10)
        })

        update()
    });
})(jQuery);