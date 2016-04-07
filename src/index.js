'use strict';

var css = require('css');

module.exports = function (data, options) {    
    options = Object.assign({
        properties: ['color', 'background-color', 'border-color']
    }, options);
    
    let code = css.parse(data);
    
    /* Get only declarations with the specied properties */
    function filterDeclaration(declaration) {
        return options.properties.indexOf(declaration.property) !== -1;
    }
    
    /* Get only rules with the properties provided in the options */
    function filterRules(rules) {
        return rules.filter(rule=>rule.type === 'rule' || rule.type === 'media').map(function(rule) {
            if( rule.type === 'rule' ) {            
                var declarations = rule.declarations.filter(filterDeclaration);

                if ( declarations.length ) {
                    rule.declarations = declarations;

                    return rule;
                }
            } else {
                rule.rules = rule.rules.filter(rule=>rule.type === 'rule').map(function(rule) {
                    var declarations = rule.declarations.filter(filterDeclaration);
                    
                    if ( declarations.length ) {
                        rule.declarations = declarations;

                        return rule;
                    }
                }).filter(rule=>rule !== undefined);
                                
                if( rule.rules.length ) {
                    return rule;
                }
            }

            return null;
        }).filter(rule=>rule !== null);      
    }
    
    let rules = filterRules(code.stylesheet.rules);
    
    code.stylesheet.rules = rules;
    
    return css.stringify(code);
};