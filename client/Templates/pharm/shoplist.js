this.maliste = new ReactiveVar([]);
const itemsPerPage = 9;
const currentPage = new ReactiveVar(1);
Template.shoplist.onCreated(function() {
  var self=this;
  maliste.set(Shop.find({}, {sort: {createdAt: -1}}));
  self.autorun(function(){
      self.subscribe('list');
  });
  this.autorun(() => {
    const page = currentPage.get();
    this.subscribe('paginatedShops', page, itemsPerPage);
  });
  
  Blaze._allowJavascriptUrls();

});
Template.shoplist.onRendered(function(){
    
      $('.post-module').hover(function() {
      Bert.alert(Date());
      });
      $('.data').scroll(function() {
      Bert.alert(Date());
      });
   
});
Template.shoplist.helpers({
    shops() {
      return Shop.find({}, { skip: (currentPage.get() - 1) * itemsPerPage, limit: itemsPerPage });
    },
    page() {
      return currentPage.get();
    },
    list: function(){
      
        return maliste.get();
    },
    listItem: function(){
      
        return maliste.get().count();
    },
    counter() {
    return Template.instance(this._id).counter.get();
    },
    files: function() {
    return Articles.findOne({ShopId: this._id});
    },
    pharmstatusClass: function(){
      if (this.garde == "non"){
        return "label label-large label-important   hidden";
      } else {
        return "label label-large label-important ";
      }
    },
    // pharmstatus: function() {
    //   return _.uniq(Shop.find({},{sort: {
    //     garde: 1},fields:{garde:true}
    //   }).fetch(), true, doc => {
    //     return doc.tag;
    //   });
    // },
    /*commentsCount: function() {
      return Comments.find({ShopId: this._id}).count();
    },
    ShopArticlesCount: function() {
      return Articles.find({fileShopId: this._id}).count();
    },*/
    newshopClass: function(){
    var start = this.createdAt;
    var end   = new Date();
    var diff  = new Date(end - start);
    var days  = diff/1000/60/60/24;

    if (days > 1) {
      return 'label label-default newshop hidden';
      } else {
        return 'label label-danger newshop ';
      }
    }
    /*upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }
  // {{upvotedClass}}
  */
});
Template.count.helpers({
    commentsCount: function() {
      return Comments.find({ShopId: this._id}).count();
    }
});
Template.ArticleCount.helpers({
    ShopArticlesCount: function() {
      return Articles.find({fileShopId: this._id}).count();
    }
});
Template.shoplist.events({
  'click #likebtn'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

  },
  'click #galery': function() {
    return Shop.findOne({_id:Router.current().params._id});
  },
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },
  'click .next-page'(event, template) {
    currentPage.set(currentPage.get() + 1);
  },
  'click .prev-page'(event, template) {
    if (currentPage.get() > 1) {
      currentPage.set(currentPage.get() - 1);
    }
  }
});
Template.shoplist.onRendered(function(){
  $(window).load(function() {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});



});
