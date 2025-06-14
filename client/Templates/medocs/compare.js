Template.compare.helpers({

  medocpicture:function(){
     var mpicitem = '';

     var photo = Articles.findOne({productid:this._id});

    return photo;
  },
  // photoCount:function(){
  //   // return Articles.findOne({productid:this._id}).count();
  // },
  allresults:function(brand){
    var thebrand = this.brand
    return Productdata.find({brand:thebrand});
  },
  comparemedoc: function(){
    return  Productdata.findOne(Router.current().params._id);
  },
  sortmedoc:function(brand){
    var thebrand = this.brand
    return Productdata.find({brand:thebrand},{sort:{"price":1},limit:5});

  },
  // ... autres helpers
    getPhoto(photo) {
      return photo && photo.length > 0
        ? photo
        : '/default.jpg'; // chemin vers l’image par défaut
    }

});
Template.compare.onRendered(function() {
  $(function () {
       "use strict"; // jshint ;_;

      /* MAGNIFY PUBLIC CLASS DEFINITION
      * =============================== */

      var Magnify = function (element, options) {
      this.init('magnify', element, options)
      }

      Magnify.prototype = {

      constructor: Magnify

      , init: function (type, element, options) {
      var event = 'mousemove'
          , eventOut = 'mouseleave';

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.nativeWidth = 0
      this.nativeHeight = 0

      this.$element.wrap('<div class="magnify" \>');
      this.$element.parent('.magnify').append('<div class="magnify-large" \>');
      this.$element.siblings(".magnify-large").css("background","url('" + this.$element.attr("src") + "') no-repeat");

      this.$element.parent('.magnify').on(event + '.' + this.type, $.proxy(this.check, this));
      this.$element.parent('.magnify').on(eventOut + '.' + this.type, $.proxy(this.check, this));
      }

      , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
          options.delay = {
              show: options.delay
              , hide: options.delay
          }
      }

      return options
      }

      , check: function (e) {
      var container = $(e.currentTarget);
      var self = container.children('img');
      var mag = container.children(".magnify-large");

      // Get the native dimensions of the image
      if(!this.nativeWidth && !this.nativeHeight) {
          var image = new Image();
          image.src = self.attr("src");

          this.nativeWidth = image.width;
          this.nativeHeight = image.height;

      } else {

          var magnifyOffset = container.offset();
          var mx = e.pageX - magnifyOffset.left;
          var my = e.pageY - magnifyOffset.top;

          if (mx < container.width() && my < container.height() && mx > 0 && my > 0) {
              mag.fadeIn(100);
          } else {
              mag.fadeOut(100);
          }

          if(mag.is(":visible"))
          {
              var rx = Math.round(mx/container.width()*this.nativeWidth - mag.width()/2)*-1;
              var ry = Math.round(my/container.height()*this.nativeHeight - mag.height()/2)*-1;
              var bgp = rx + "px " + ry + "px";

              var px = mx - mag.width()/2;
              var py = my - mag.height()/2;

              mag.css({left: px, top: py, backgroundPosition: bgp});
          }
      }

      }
      }


      /* MAGNIFY PLUGIN DEFINITION
      * ========================= */

      $.fn.magnify = function ( option ) {
      return this.each(function () {
      var $this = $(this)
          , data = $this.data('magnify')
          , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Magnify(this, options)))
      if (typeof option == 'string') data[option]()
      })
      }

      $.fn.magnify.Constructor = Magnify

      $.fn.magnify.defaults = {
      delay: 0
      }


      /* MAGNIFY DATA-API
      * ================ */

      // $(window).on('load', function () {
      $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify()
      })
    // })

    });



    $(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

    jQuery(document).ready(function(){
      var sum = 0;
      var prixmoy = 0;
      var nbreLines = 1;
      var dataTable = document.getElementById("allresults");
      var pmTable = document.getElementById("prixmoy");

  // use querySelector to find all second table cells

      var cells = document.querySelectorAll("td:nth-of-type(4)");

      for (var i = 0; i < cells.length; i++)
      sum+=parseFloat(cells[i].firstChild.data);
      nbreLines = cells.length;
      prixmoy = (sum/nbreLines);

      // now add sum to end of table
      var newRow = document.createElement("tr");

      // first cell
      var firstCell = document.createElement("th");
      var firstCellText = document.createTextNode("Prix Moyen (XAF):  ");
      firstCell.appendChild(firstCellText);
      newRow.appendChild(firstCell);
      // second cell with sum
      var secondCell = document.createElement("th");
      var secondCellText = document.createTextNode(prixmoy);
      secondCell.appendChild(secondCellText);
      newRow.appendChild(secondCell);

      // add row to table
      pmTable.appendChild(newRow);

    });
  });
