angular.module('metadataApp')
.factory('aia_lev1', function(getPropFilter){
	
	var wavelnth = [94, 131, 171, 193, 211, 304, 335, 1600, 1700, 4500];
	
	return {
		columns: [
			['date_obs', 'Observation date'],
			['wavelnth', 'Wavelength (Å)'],
			['quality', 'Quality'],
		],
		form_template_url: '/SVO/metadata/aia_lev1.html',
		form_config: {
			wavelnth: wavelnth
		},
		parse_location_search: parse_location_search
	};
	
	
	// parse the location search values into search criteria
	function parse_location_search(search_criteria) {
		if(search_criteria.wavemin__lte != undefined || search_criteria.wavemax__gte != undefined)
		{
			search_criteria.wavelnth__in = wavelnth;
		}
		
		if(search_criteria.wavemin__lte != undefined) {
			search_criteria.wavelnth__in = search_criteria.wavelnth__in.filter(function(w){return w/10. <= search_criteria.wavemin__lte});
		}
		
		if(search_criteria.wavemax__gte != undefined) {
			search_criteria.wavelnth__in = search_criteria.wavelnth__in.filter(function(w){return w/10. >= search_criteria.wavemax__gte});
		}
		delete search_criteria.wavemax__gte;
		delete search_criteria.wavemin__lte;
		
		return search_criteria;
	}

});