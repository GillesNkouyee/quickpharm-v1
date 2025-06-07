
Template.searchshop.events ({
	"keyup input, change input[type='radio']": _.throttle(function(e) {
var shopstyle = $("[name='shopstyle']").val().trim(),
		shopadress = $("[name='shopadress']").val().trim(),
		garde = $("[name='garde']").val().trim(),
		garde = $("input[name='garde']:checked").val();
		search = {};
		if(shopstyle) search.shopstyle = {$regex: new RegExp(shopstyle),
		$options: "i"};
		if(shopadress) search.shopadress = {$regex: new RegExp(shopadress),
		$options: "i"};
		if(garde) search.garde = {$regex: new RegExp(garde),
		$options: "i"};

		maliste.set(Shop.find(search));
	},200),
	
});
// Template.filter.events({
//     'click input[type=checkbox]': function (ev, tpl) {
//       var garde = tpl.$('input:checked').map(function () {
//         return $(this).val();
//       });
//       Session.set('garde', $.makeArray(garde));
//     }
//   });
// Template.filter.checked = function () {
//     if (_.contains(Session.get('garde'), this.toString())) {
//       return {checked: true};
//     }
//   };
//
// 	Template.filter.status = function () {
//     return _.uniq(Shop.find().map(function (shop) { return shop.garde; }));
//   };
//
//   Session.setDefault('garde', []);

/*Template.searchitem.events ({
"keyup input": _.debounce(function(e){
var shopitem = $("[name='shopitems']").val().trim(),
searchit = {};
if(shopitem) searchit.shopitem = {$regex: new RegExp(shopitem),
$options: "i"};

mesarticles.set(Shop.findOne(searchit));
},200),

 'click .clothes':function(event,tpl){
    	event.preventDefault();
    	$('div').each(function(){
    		if (( $(this).attr('id') == "chaussures" || $(this).attr('id')== "accessoires")) {
    			$(this).hide();
    			console.log("ca marche");
    		}

    	});
    }
});*/
//Router.current().params._id,{fields:{shopitems:1}}
