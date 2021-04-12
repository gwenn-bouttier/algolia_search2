
/*gbo add */
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
   
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
    
  var month = months[a.getMonth()];
  var date = a.getDate();
  
  var time = date + ' ' + month + ' ' + year ;
  return time;
}

function determineBorder(quality)
{
    
    
    var borderColor = "";
    if (quality > 90)
        {
            
            borderColor = "green";
        }
    
    return borderColor;
    
}

/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'Wine',
  searchClient: algoliasearch('3962YUZC7E', '3bebd61f4b5d8929925b6eb8bd5aecd3'),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  instantsearch.widgets.refinementList({
    container: '#years-list',
    attribute: 'year',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    
    transformItems: items => items.map(item => ({ ...item,
        cssBorder: determineBorder(item.quality)
                                                 
    })),
      
    templates: {
      item: `
        <div class="{{cssBorder}}">
          
          <div class="hit-picture">

            <img src="{{image}}"/>
          </div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "year" }{{/helpers.highlight}}
          </div>
          <div class="hit-quantity">
            {{#helpers.highlight}}{ "attribute": "quantity" }{{/helpers.highlight}}
          </div>
            

          
          
        </div>
      `,
     
     
        
        
        
        
        
        
        
        
        
        
        
    },
    
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),

  instantsearch.widgets.stats({
      container: '#numberHits',
      templates: {
        text: `
          {{#areHitsSorted}}
            {{#hasNoSortedResults}}No relevant results{{/hasNoSortedResults}}
            {{#hasOneSortedResults}}1 relevant result{{/hasOneSortedResults}}
            {{#hasManySortedResults}}{{#helpers.formatNumber}}{{nbSortedHits}}{{/helpers.formatNumber}} relevant results{{/hasManySortedResults}}
            sorted out of {{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}}
          {{/areHitsSorted}}
          {{^areHitsSorted}}
            {{#hasNoResults}}No results{{/hasNoResults}}
            {{#hasOneResult}}1 result{{/hasOneResult}}
            {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
          {{/areHitsSorted}}
          found in {{processingTimeMS}}ms
        `,
      },
    }),
]);

search.start();
