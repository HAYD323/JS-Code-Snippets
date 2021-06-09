/**
         * Make form inputs uniq
         * @param {String} form - The CSS selector for the form
         * @param {Array|String} fields - A Array of CSS Selector Strings OR A coma seperated string of CSS selectors
         * @returns {Array} - A node list of all elements changed
         */
         // ways the fucntion can be called:
         //
         // the call below will look for the data attribute "uniqname" and make the inputs name unique
         // uniqEmailInputNames()
         //
         // the call below will do the above and then look for the field with the id "k_id_manufacture_date" then the field with the id "k_id_phone" in the form (this is required for this way of calling) with the id aristot_product_registration
         // uniqEmailInputNames('#aristot_product_registration','#k_id_manufacture_date,#k_id_phone')
         //
         function uniqEmailInputNames(form,fields) {
            const function_name = 'uniqEmailInputNames';
            let fieldsArr;
            if (typeof fields == 'string') {
               fields = fields.split(',').map( str => str.trim() )
            }

            if (!form) {
               console.warn(function_name+': No Form Specified')
            }

            let _fields = fields || [];
            let _fieldElements = getFieldElements(form,_fields);

            if (_fieldElements.length <=0) {
               console.warn(function_name+': uniqEmailInputNames: No Inputs Found');
               return
            }
            var time = Date.now()
            let _$fields = document.querySelector('[name="$fields"]');
            _fieldElements.forEach( ele => {
               if (_$fields) {
                let splitStr = _$fields.value.split(ele.name);
               }
               if (ele.name.indexOf('__$') >= 0) {
                  ele.name = ele.name.split('__$')[0]
               }
               ele.name = `${ele.name}__$${time}`;
               if (_$fields) {
                   splitStr[0] += ele.name;
                    _$fields.value = splitStr.join('')
               }
            });

         return _fieldElements
         }

         function getFieldElements(form,fields) {
            let output = [],
               queryString = `[data-uniqname]`;

            if (fields.length > 0 && form) {
               for (let i=0; i< fields.length; i++) {
                     queryString += `, ${form} ${fields[i]}`;
               }
            }
            output = document.querySelectorAll(queryString);
            return output;
         }
         window.addEventListener('load', uniqEmailInputNames );
         document.querySelector('#aristot_product_registration [type="submit"]').addEventListener('click', uniqEmailInputNames )
