/**
 * Created by binwang on 17/8/24.
 */
import  _ from 'lodash';

function util(context) {
    "use strict";
    let fields = [];

    this.defaultQuery = (_q = {}) => {
        return {
            current: 1,
            pageSize: 10,
            filter: null,
            sortField: null,
            sortOrder: null,
            ..._q
        };
    }
    this.initFields = (fields) => {
        this.fields(fields);
        return this;
    }
    this.fields = (field) => {
        if (_.isArray(field)) {
            field.map(f => this.fields(f));
        } else if (_.isObject(field)) {
            // if(field.scope && _.indexOf(field.scope,'form') == -1)
            //     return fields;
            fields.push(field);
        } else {
            return _.sortBy(fields, f => f.formIndex);
        }
    }
    this.forms = () => {
        var forms = {};
        _.forEach(fields, f => {
            if (!f.scope || _.indexOf(f.scope, 'form') > -1) {
                let initValue = null;
                if (f.type === 'select' && f.multiple || f.type === 'checkbox') {
                    initValue = []
                }
                _.assign(forms, {[f.id]: f.defaultValue || initValue});
            }
        });
        return forms;
    }
    this.columns = () => {
        return _.chain(fields).filter(f => {
            return f.type !== 'hidden' && (!f.scope || _.indexOf(f.scope, 'column') > -1);
        }).map(f => {
            return {
                key: f.id,
                title: f.label,
                ...f
            }
        }).value();
    }
    this.rules = () => {
        var rules = {};
        _.forEach(fields, f => {
            if (!f.scope || _.indexOf(f.scope, 'form') > -1)
                _.assign(rules, {[f.id]: f.rules || null})
        });
        return rules;
    }
    this.queryFields = () => {
        var queryFields = _.filter(fields, f => {
            if (!f.scope || _.indexOf(f.scope, 'searchForm') > -1)
                return true
        });
        return queryFields;
    }
}

export default (context) => new util(context);