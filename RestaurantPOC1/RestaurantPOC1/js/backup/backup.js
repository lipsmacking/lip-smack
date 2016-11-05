// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures','ui.bootstrap'
]);

app.run(function($transform) {
  window.$transform = $transform;


});

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: '/catalog/assets/views/deals.html', reloadOnSearch: false});
  $routeProvider.when('/catalog',        {templateUrl: '/catalog/assets/views/catalogue.html', reloadOnSearch: false}); 
  // $routeProvider.when('/internet',          {templateUrl: '/catalog/assets/views/internet.html', reloadOnSearch: false}); 
  $routeProvider.when('/home',     {templateUrl: '/catalog/assets/views/deals.html', reloadOnSearch: false});
  $routeProvider.when('/menu',     {templateUrl: '/catalog/assets/views/menu.html', reloadOnSearch: false});
  // $routeProvider.when('/menu2',     {templateUrl: '/catalog/assets/views/menu2.html', reloadOnSearch: false});
   $routeProvider.when('/signup',       {templateUrl: '/catalog/assets/views/signup.html', reloadOnSearch: false});
  // $routeProvider.when('/catdetails',       {templateUrl: '/catalog/assets/views/catdetails.html', reloadOnSearch: false});
  $routeProvider.when('/fillfbhome',       {templateUrl: '/catalog/assets/views/fillfbhome.html', reloadOnSearch: false}); 
  $routeProvider.when('/fillfbnext',       {templateUrl: '/catalog/assets/views/fillfbnext.html', reloadOnSearch: false});
  $routeProvider.when('/submitfeedback',       {templateUrl: '/catalog/assets/views/submitfeedback.html', reloadOnSearch: false});

});

// 
// `$touch example`
// 

app.directive('toucharea', ['$touch', function($touch){
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;  
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}]);


// app.directive('readMore', function() {
//   return {
//     restrict: 'A',
//     transclude: true,
//     replace: true,
//     template: '<p></p>',
//     scope: {
//       moreText: '@',
//       lessText: '@',
//       words: '@',
//       ellipsis: '@',
//       char: '@',
//       limit: '@',
//       content: '@'
//     },
//     link: function(scope, elem, attr, ctrl, transclude) {
//       var moreText = angular.isUndefined(scope.moreText) ? ' <a class="read-more">Read More...</a>' : ' <a class="read-more">' + scope.moreText + '</a>',
//         lessText = angular.isUndefined(scope.lessText) ? ' <a class="read-less">Less ^</a>' : ' <a class="read-less">' + scope.lessText + '</a>',
//         ellipsis = angular.isUndefined(scope.ellipsis) ? '' : scope.ellipsis,
//         limit = angular.isUndefined(scope.limit) ? 150 : scope.limit;

//       attr.$observe('content', function(str) {
//         readmore(str);
//       });

//       transclude(scope.$parent, function(clone, scope) {
//         readmore(clone.text().trim());
//       });

//       function readmore(text) {

//         var text = text,
//           orig = text,
//           regex = /\s+/gi,
//           charCount = text.length,
//           wordCount = text.trim().replace(regex, ' ').split(' ').length,
//           countBy = 'char',
//           count = charCount,
//           foundWords = [],
//           markup = text,
//           more = '';

//         if (!angular.isUndefined(attr.words)) {
//           countBy = 'words';
//           count = wordCount;
//         }

//         if (countBy === 'words') { // Count words

//           foundWords = text.split(/\s+/);

//           if (foundWords.length > limit) {
//             text = foundWords.slice(0, limit).join(' ') + ellipsis;
//             more = foundWords.slice(limit, count).join(' ');
//             markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
//           }

//         } else { // Count characters

//           if (count > limit) {
//             text = orig.slice(0, limit) + ellipsis;
//             more = orig.slice(limit, count);
//             markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
//           }

//         }

//         elem.append(markup);
//         elem.find('.read-more').on('click', function() {
//           $(this).hide();
//           elem.find('.more-text').addClass('show').slideDown();
//         });
//         elem.find('.read-less').on('click', function() {
//           elem.find('.read-more').show();
//           elem.find('.more-text').hide().removeClass('show');
//         });

//       }
//     }
//   };
// });

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem){
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if( drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() { 
                scope.$apply(function() {
                  dismissFn(scope);  
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create 
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();
      
      var zIndex = function(){
        var res = 0;
        if (id === carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(){
        elem[0].style.zIndex = zIndex();
      });
      
      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          // 
          // use translate both as basis for the new transform:
          // 
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);
          
          //
          // Add rotation:
          //
          var Dx    = touch.distanceX, 
              t0    = touch.startTransform, 
              sign  = Dx < 0 ? -1 : 1,
              angle = sign * Math.min( ( Math.abs(Dx) / 700 ) * 30 , 30 );
          
          t.rotateZ = angle + (Math.round(t0.rotateZ));
          
          return t;
        },
        move: function(drag){
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');  
          } else {
            elem.removeClass('dismiss');  
          }
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag){
  return {
    controller: function($scope, $element) {
      $drag.bind($element, 
        {
          //
          // Here you can see how to limit movement 
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope,$location){


  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);

    
  };

  $location.path("/")

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
    $rootScope.handlelowerNavBar="";
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  // 
  // 'Scroll' screen
  // 
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    /* global alert: false; */
    alert('Congrats you scrolled to the end of the list!');
  };

  // 
  // Right Sidebar
  // 
  
  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;
  $scope.email = 'me@example.com';
  
  $scope.login = function() {
    alert('You submitted the login form');
  };

  // 
  // 'Drag' screen
  // 
  $scope.notices = [];
  
  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };

$rootScope.showhomebar=true;
$rootScope.feedback = {};
$rootScope.user={};
$rootScope.catLikecount=0;

$rootScope.templates={
  "formName": "Restaurant Form",
  "industryType": "Hotel",
  "isPublic": true,
  "formData": [{
    "qText": "Did you get what you were looking for?",
    "param": "foundproduct",
    "ansType": "radioIfNoSubQ",
    "ansValue": [],
    "subQtext": "",
    "subParam": "lookingfor",
    "subAnsType": "text",
    "subAnsValue": ""
  }, {
    "qText": "Did you like our Range of Products?",
    "param": "liked",
    "ansType": "radioIfNoSubQ",
    "ansValue": [],
    "subQtext": "",
    "subParam": "concerns",
    "subAnsType": "checkbox",
    "subAnsValue": ""
  }, {
    "qText": "Overall rating",
    "param": "overallRating",
    "ansType": "star",
    "ansValue": ""

  }, {
    "qText": "Comments",
    "param": "comments",
    "ansType": "text",
    "ansValue": ""
  }],
  "design": {
    "bgColor": "white",
    "logo": "asd.jpeg"
  }
};


$rootScope.dealsCatalog=[{
  "Title": " Sunday",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "img": "assets/img/breezers.jpg"
},{
  "Title": " Monday",
  "discount": "",
  "mrp": "1500",
  "newPrice": "750",
  "img": "assets/img/chickenPizza.jpg"
},{
  "Title": " Tuesday",
  "discount": "",
  "mrp": "500",
  "newPrice": "",
  "img": "assets/img/chickenSizzler.jpg"
},{
  "Title": " Wednesday",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "img": "assets/img/margaritaPizza.jpg"
},{
  "Title": " Thursday",
  "discount": "",
  "mrp": "1500",
  "newPrice": "750",
  "img": "assets/img/mojito.jpg"
},{
  "Title": " Friday",
  "discount": "",
  "mrp": "500",
  "newPrice": "",
  "img": "assets/img/nonVegLasagna.jpg"
},{
  "Title": " Saturday",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "img": "assets/img/pint.jpg"
},{
  "Title": " Only on weekdays",
  "discount": "",
  "mrp": "1500",
  "newPrice": "750",
  "img": "assets/img/vegLasagna.jpg"
},{
  "Title": " Only on weekends",
  "discount": "",
  "mrp": "500",
  "newPrice": "",
  "img": "assets/img/vegsizzler.jpg"
},{
  "Title": "Everyday",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "img": "assets/img/vodka.jpg"
}];






$rootScope.feedbackValues=[{
  "Q1": ""
}, {
  "Q2": []
}, {
  "Q3": [{},{values:[]}]
}, {
  "Q4": ""
}];



$scope.submitForm=function(textvalue){

  $rootScope.msg=textvalue;
  console.log("Msg is "+$rootScope.msg);
}

});




// $scope.submitForm=function(){

//   $location.path('#/submitfeedback');

// };

// app.directive('starRating',
//     function() {
//   return {
//   restrict : 'A',
//   template : '<ul class="rating">'
//      + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
//      + '  <i class="fa fa-star fa-lg"></i>'
//      + ' </li>'
//      + '</ul>',
//   scope : {
//    ratingValue : '=',
//    max : '=',
//    onRatingSelected : '&'
//   },
//   link : function(scope, elem, attrs) {
//    var updateStars = function() {
//     scope.stars = [];
//     for ( var i = 0; i < scope.max; i++) {
//      scope.stars.push({
//       filled : i < scope.ratingValue
//      });
//     }
//    };
   
//    scope.toggle = function(index) {
//     scope.ratingValue = index + 1;
//     scope.onRatingSelected({
//      rating : index + 1
//     });
//    };
   
//    scope.$watch('ratingValue',
//     function(oldVal, newVal) {
//      if (newVal) {
//       updateStars();
//      }
//     }
//    );
//   }
//   };
//   }
//   );


// start of feedback controller

app.controller('FbController', function($rootScope, $scope){

  Array.prototype.remove = function(value) {
    if (this.indexOf(value)!==-1) {
       this.splice(this.indexOf(value), 1);
       return true;
   } else {
      return false;
   };
} 



// by Rahul
$rootScope.rating = 0;

// end by Rahul

  $rootScope.showhomebar=false;

$rootScope.msg="";
$scope.price=false;
$scope.variety=false;
$scope.quality=false;
$scope.one=false;
$scope.two=false;
$scope.three=false;
$scope.four=false;
$scope.five=false;
$scope.stars=5;
$scope.returnPolicy=false;
$scope.storeLayout=false;
$scope.staff=false;
$scope.billing=false;
$scope.amenities=false;
$scope.discountDeals=false;



$scope.setPr =function(val){
  $scope.pr=val;
  if($scope.pr=="1"){
  if($rootScope.feedbackValues[1].Q2=="No"||$rootScope.feedbackValues[1].Q2==""){
  $rootScope.feedbackValues[1].Q2.push("Yes");
}

}
  


  if($scope.pr=="-1"){
  if($rootScope.feedbackValues[1].Q2=="Yes"||$rootScope.feedbackValues[1].Q2==""){
 $rootScope.feedbackValues[1].Q2.push("No");
}

}

  

}


$scope.toggle=function(val){
  $rootScope.feedbackValues[3].Q4=val;
  
  switch(val){
    case 'price':
    $scope.price=!$scope.price;
    if($scope.price==true)
      $rootScope.feedbackValues[1].Q2.push("price");
    if($scope.price==false){
    $rootScope.feedbackValues[1].Q2.remove("price");}
    break;

    case 'variety':
     $scope.variety=!$scope.variety;
     if($scope.variety==true)
      $rootScope.feedbackValues[1].Q2.push("variety");
    if($scope.variety==false)
      $rootScope.feedbackValues[1].Q2.remove("variety");
     break;

    case 'quality':
     $scope.quality=!$scope.quality;
     if($scope.quality==true)
      $rootScope.feedbackValues[1].Q2.push("quality");
    if($scope.quality==false)
      $rootScope.feedbackValues[1].Q2.remove("quality");
    break;

    case 'rp':
    $scope.returnPolicy=!$scope.returnPolicy;
    if($scope.returnPolicy==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Return Policy");
    if($scope.returnPolicy==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Return Policy");
    break;

    case 'sl':
    $scope.storeLayout=!$scope.storeLayout;
    if($scope.storeLayout==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Store Layout");
    if($scope.storeLayout==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Store Layout");
    break;

    case 'st':
    $scope.staff=!$scope.staff;
    if($scope.staff==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Staff");
    if($scope.staff==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Staff");
    break;

    case 'bill':
    $scope.billing=!$scope.billing;
    if($scope.billing==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Billing");
    if($scope.billing==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Billing");
    break;

    case 'am':
    $scope.amenities=!$scope.amenities;
    if($scope.amenities==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Amenities");
    if($scope.amenities==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Amenities");
    break;

    case 'dd':
    $scope.discountDeals=!$scope.discountDeals;
    if($scope.discountDeals==true)
    $rootScope.feedbackValues[2].Q3[1].values.push("Discount&Deals");
    if($scope.discountDeals==false)
    $rootScope.feedbackValues[2].Q3[1].values.remove("Discount&Deals");
    break;

    case 'yes':
    return $rootScope.feedbackValues[0].Q1="I got what I wanted";

    case 'no':
    return $rootScope.feedbackValues[0].Q1="I did not get what I wanted";

  }
}




});

// end of feedback controller
// 
// 
// 
// 
// 
// 
// 


// 
// 
// 
// 
// 
// 
// typeController start

 app.controller('typeController', function($rootScope, $scope, $location){
// by vishnu


$scope.init=function(){



  $rootScope.passedId=null;
  $rootScope.passedItemId=null;

  $scope.typeCatalog=
[{
  "parentId": 1,
  "id": "1",
  "title": "Bar Menu",
  "url": "/assets/img/bar.jpg",
  },
  {
  "parentId": 2,
  "id": "2",
  "title": "Food Menu",
  "url": "/assets/img/starters.jpg",
  }];

}


// $scope.typegpage  = '/';
//   $rootScope.selCategory = 'reco';
//   $scope.setPage = function(pagename, category){

//     // Function is written with generic parameters. 
//     // To Be Updated Later

//       $location.path($scope.typepage);

//   }




  $scope.setCatId=function(id){

    $rootScope.passedId=id;

    console.log("Passed ID");
    console.log($rootScope.passedId);

  }


});

// typeController end 
// 
// 
// 
// 
// 
// 
//


// 
// 
// 
// 
// 
// 
// 
// 
// main catalog controller starts

app.controller('mainCatController', function($rootScope, $scope, $location){
// by vishnu
$scope.init=function(){

// $rootScope.passedItemId=0;

  $scope.mainCatalog=
[{
  "parentId": 1,
  "id": "1",
  "title": "Rum",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/chickenSizzler.jpg",
  "badge": "50%",
  "price": "999 - 99",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "4.5"
},
{
  "parentId": 1,
  "id": "2",
  "title": "whiskey",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/chickenSizzler.jpg",
  "badge": "50%",
  "price": "999 - 99",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "4.5"
},
{
  "parentId": 1,
  "id": "3",
  "title": "vodka",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/chickenSizzler.jpg",
  "badge": "50%",
  "price": "999 - 99",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "4.5"
},
{
  "parentId": 2,
  "id": "1",
  "title": "Soups",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/soup.jpg",
  "badge": "15%",
  "price": "850 - 85",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "3.4"
},
{
  "parentId": 2,
  "id": "2",
  "title": "Starters",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/soup.jpg",
  "badge": "15%",
  "price": "850 - 85",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "3.4"
},
{
  "parentId": 2,
  "id": "3",
  "title": "breads",
  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "url": "/assets/img/soup.jpg",
  "badge": "15%",
  "price": "850 - 85",
  "calcPrice": "500",
  "isLike": true,
  "hasDetails": true,
  "avg": "3.4"
}];

 

}

$scope.setItemId=function(id){

    $rootScope.passedItemId=id;

    console.log("Passed  Item ID");
    console.log($rootScope.passedItemId);

  }



// $scope.catalogpage  = 'catalog';
//   $rootScope.selCategory = 'reco';
//   $scope.setPage = function(pagename, category){

//     // Function is written with generic parameters. 
//     // To Be Updated Later

//       $location.path($scope.catalogpage);
      

//   }




});


// maincatalog controller end
// 
// 
// 
// 
// 
// 
//  


// 
// 
// 
// 
// 
// 
// catalogue controller start


app.controller('CatalogueController', function($rootScope, $scope, $location){
  

  // By Rahul
  // $scope.menupage  = 'menu';
  // $rootScope.selCategory = 'reco';
  // $scope.setPage = function(pagename, category){

  //   // Function is written with generic parameters. 
  //   // To Be Updated Later

  //     $location.path($scope.menupage);

  }
  // end - by Rahul




   $rootScope.showhomebar=true;
   // $scope.likeFlag=false;
   $scope.qty=0;

   $scope.qtyMsg="Add to Cart";
   $scope.wish=false;
   $scope.rating=2;
   $rootScope.isSoldOut=false;


   // $scope.mrp=$rootScope.dealsCatalog[0].mrp;
   // // $rootScope.dealsCatalog="";
   //  $scope.discount=$rootScope.dealsCatalog[0].discount;
   //  $scope.newPrice=$rootScope.dealsCatalog[0].newPricee;
   
 $scope.showDiscount=[];
 $scope.showNewPrice=[];
  for (var i = 0; i < $rootScope.dealsCatalog.length; i++) {
       // console.log("for called");
    if( $rootScope.dealsCatalog[i].discount!=""){
      // console.log("if 1");
      $scope.showDiscount[i]=$rootScope.dealsCatalog[i].discount;
     $scope.showNewPrice[i]=$rootScope.dealsCatalog[i].mrp-$rootScope.dealsCatalog[i].mrp*($rootScope.dealsCatalog[i].discount/100);
    // console.log($scope.showNewPrice);
   }
   
   else if($rootScope.dealsCatalog[i].newPrice!=""){
// console.log("if 2"); 
    $scope.showNewPrice[i]=$rootScope.dealsCatalog[i].newPrice;
    // console.log($scope.showNewPrice[i]);
    $scope.showDiscount[i]=parseInt(($rootScope.dealsCatalog[i].mrp-$rootScope.dealsCatalog[i].newPrice)/$rootScope.dealsCatalog[i].mrp*100);
    // $scope.showDiscount=parseInt(d.discount);
    // console.log($scope.showDiscount[i]);
   }

   else if($rootScope.dealsCatalog[i].newPrice=="" && $rootScope.dealsCatalog[i].discount==""){
    // console.log("if 3")
    $scope.showNewPrice[i]=$rootScope.dealsCatalog[i].mrp;
    $scope.showDiscount[i]="0";

   }



  };


// $scope.calc=function(d){

  
//     console.log("Init called");
//     if(d.discount!=""){
//       console.log("if 1");
//       $scope.showDiscount=d.discount;
//      $scope.showNewPrice=d.mrp-d.mrp*(d.discount/100);
//     console.log($scope.showNewPrice);
//    }
   
//    else if(d.newPrice!=""){
// console.log("if 2");
//     $scope.showNewPrice=d.newPrice;
//     $scope.showDiscount=(d.mrp-d.newPrice)/d.mrp*100;
//     // $scope.showDiscount=parseInt(d.discount);
//    }

//    else if(d.newPrice=="" && d.discount==""){
//     console.log("if 3")
//     $scope.showNewPrice=d.mrp;
//     $scope.showDiscount="0";

//    }

//    };


   $scope.initMenu1=function(){

    console.log("Init called");
    console.log($rootScope.passedId);

$scope.showheading=true;
$scope.showlike=true;
$scope.showimg=true;
   // if showimg=false, showbadge also must be false
$scope.showbadge=true;
   // always include text (mandatory)
$scope.showtext=true;
$scope.showtable=true;
$scope.showsize=true;
$scope.showveg=true;
$scope.showcolors=true;
$scope.showchilly=true;
$scope.showprice=true;
$scope.showrating=true;
$scope.showcart=true;
$scope.showmoredetail=true;



   



   $scope.catalogDetails=
[

// 111

{"gId":"1",
  "parentId": "1",
  "id": "1",
  "title": "111",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 112
{ "gId":"1",
  "parentId": "1",
  "id": "2",
  "title": "112",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 121
{ "gId":"1",
  "parentId": "2",
  "id": "1",
  "title": "121",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 122
{ "gId":"1",
  "parentId": "2",
  "id": "2",
  "title": "122",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 131
{
  "gId":"1",
  "parentId": "3",
  "id": "1",
  "title": "131",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 132
{ "gId":"1",
  "parentId": "3",
  "id": "2",
  "title": "132",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 211
{
  "gId":"2",
  "parentId": "1",
  "id": "1",
  "title": "211",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},



// 212
{ "gId":"2",
  "parentId": "1",
  "id": "2",
  "title": "212",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},



// 221
{ "gId":"2",
  "parentId": "2",
  "id": "1",
  "title": "221",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},



// 222
{ "gId":"2",
  "parentId": "2",
  "id": "2",
  "title": "222",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},


// 231
{ "gId":"2",
  "parentId": "3",
  "id": "1",
  "title": "231",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
},
// 232
{ "gId":"2",
  "parentId": "3",
  "id": "2",
  "title": "232",
  "badge": "20%",
  "price": "2099",
  "img": "/assets/img/mojito.jpg",
  "likeflag": "false",
  "calcPrice": "500",
  "specs": [{key: "price", value: "500"  },
            {key: "Discount", value: "50%"},
            {key: "name", value: "mahesh"}],
  

  "details": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  
  "moredetail": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor",

  "spicy": "5",
  

  "isVeg": "true",


  "size": [
    "S",
    "M",
    "L",
    "XL"
  ],


 "colors": [
  "red",
  "blue",
  "green"
  ]
}

]//catalogDetails
};//initmenu1



       $scope.initMenu2=function(){

    console.log("Init called");
    $rootScope.menus=[{
  "Title": " Deals for the week",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "likeFlag":"false",
  "catLikecount":"15",
  "img": "assets/img/menu-1.jpg"
},{
  "Title": " Deals for the week",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "likeFlag":"false",
  "img": "assets/img/menu-1.jpg"
},{
  "Title": " Deals for the week",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "likeFlag":"false",
  "img": "assets/img/menu-1.jpg"
},{
  "Title": " Deals for the week",
  "discount": "10",
  "mrp": "100",
  "newPrice": "",
  "likeFlag":"false",
  "img": "assets/img/menu-1.jpg"
}];
      };//init menu2


      $scope.menuItems=[{
  "Category": {
    "CategoryName": "A",
    "CategoryImage": "abc.img",
    "CategoryDesc": "blabla",
    "FoodItems": [{
      "ItemName": "ItemA",
      "ItemImage": "item.jpg",
      "ItemDesc": "blabla",
      "isVeg": "True",
      "Spiciness": "4",
      "isAvailable": "true",
      "Offer": "20%",
      "PrepTime": "20mins",
      "popularity": "",
      "servingSize": "M"

    }, {
      "ItemName": "ItemA",
      "ItemImage": "item.jpg",
      "ItemDesc": "blabla",
      "isVeg": "True",
      "Spiciness": "4",
      "isAvailable": "true",
      "Offer": "20%",
      "PrepTime": "20mins",
      "popularity": "",
      "servingSize": "M"

    }]
  }
}];


  $scope.like=function(a){
    // alert("hi");
    // console.log("Like Flag is");
    // console.log($rootScope.likeFlag);
      
    if(a=='1'){
      console.log("yeah");
       $rootScope.likeFlag=true;
       console.log("Like Flag is");
    console.log($rootScope.likeFlag);
       
    }
   
  else if(a=='0'){
    $rootScope.likeFlag=false;
    
  }
  }


$scope.changeQty=function(q){


  
   if(q=='1'){
$scope.qty+=1;
$scope.qtyMsg=$scope.qty;
console.log($scope.qtyMsg);
  }
  else if(q=='-1'){
$scope.qty-=1;
$scope.qtyMsg=$scope.qty;
if($scope.qty==0)
$scope.qtyMsg="Add to Cart";

  }
}


  });
// catalogue controller end
// 
// 
// 
// 
// 
// 
// 

















// home controller start


app.controller('HomeController', function($rootScope, $scope){
  $rootScope.showhomebar=true;

  });
// home controller end

// internet controller start


app.controller('InternetController', function($rootScope, $scope){
  $rootScope.showhomebar=true;

  });
// internet controller end

// subfb controller start


app.controller('SubFbController', function($rootScope, $scope){
  $rootScope.showhomebar=true;
  console.log("Did you get what you wanted?");
  console.log($rootScope.feedbackValues[0].Q1);
  console.log("Satisfied with product range?. Reasons if No");
  console.log($rootScope.feedbackValues[1].Q2);
  console.log("Overall rating and concerns if any");
  $rootScope.feedbackValues[2].Q3.push($rootScope.rating);
  console.log($rootScope.feedbackValues[2].Q3);
  
  console.log();
  });
// subfb controller end#/home