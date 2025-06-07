Template.newnav.onRendered(function(){
  $(".openbtn").on("click", function() {
    $(".ui.sidebar").toggleClass("very thin icon");
    $(".asd").toggleClass("marginlefting");
    $(".sidebar z").toggleClass("displaynone");
    $(".ui.accordion").toggleClass("displaynone");
    $(".ui.dropdown.item").toggleClass("displayblock");
 
    $(".logo").find('img').toggle();
 
  })
  $(".ui.dropdown").dropdown({
    allowCategorySelection: true,
    transition: "fade up",
    context: 'sidebar',
    on: "hover"
  });
 
  $('.ui.accordion').accordion({
    selector: {
 
    }
  });
});
Template.newnav.helpers({
  profilepic: function() {
		return Meteor.users.findOne(Meteor.userId()).profile.avatar_url
		},
    name: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.name
  }
});
Template.newnav.events({
	'click #logout':function(){
		Meteor.logout();
		Router.go('index');
	}
});
