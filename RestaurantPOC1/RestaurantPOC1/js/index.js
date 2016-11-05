



app.controller('feedbackCtrl', function($rootScope, $scope){
 	$rootScope.feedback.dispform = true;
	   $scope.fbdata = {};
	//   var s = "LOGs:" + JSON.stringify($rootScope.user);
	 //  document.getElementById("logs").innerHTML = s;
	   $scope.status = {
	       isopen: false,
		bmonth:false,
		aday:false,	
		amonth:false	
		};
		$scope.errMsg = "";
		$scope.data={
				birthday:{day:"Day",month:'Month'},
				anniv:{day:"Day",month:'Month'},
				rating:{overall:'',food:'',ambience:'', service:'', value:''},
				comment:"",
				reference:''
		}
		$scope.submitted = false;
    	    $rootScope.user.name = "";
	        $rootScope.user.email = "";
        	$rootScope.user.phone = "";
 	$scope.init = function() {
       console.log('Initializing Template Feedback ctlr...');
	   
    };//init()
    $scope.getRoot = function(v){
        if( $rootScope['feedback'])
        return $rootScope['feedback'].v
        return ""
    }
    $rootScope.$on('feedbackCtrl', function(event, args) {
        console.log("Message for Feedback");
 		var fn = $scope[args.h.msgType];
        if(typeof fn === "function") fn($rootScope,  args);
        else console.log("FeedbackCtrl: No handler for message type " + args.h.msgType);
    });

	$scope.clear = function($rootScope,  args){
		console.log("Clear Form data");
	}

	$scope.appfg = function(){
	}

	$scope.setDay = function(what,type, value){
		$scope.data[what][type] = value;
		};

		$scope.setRating = function(rt, idx){
				$scope.data.rating[idx] = rt;
		};

		$scope.isSet = function(rt,idx){
			if($scope.data.rating[idx] >= rt)
				{
				return true;
				}
				return false;
		};

$scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
			$scope.status.bmonth = !$scope.status.bmonth;
			$scope.status.aday = !$scope.status.aday;
			$scope.status.amonth = !$scope.status.amonth;
		};
	$scope.FormComplete = function(){
if($scope.data.rating.overall > 5 || $scope.data.rating.overall < 1)
{// country mandatory
$scope.errMsg = 'Please provide Overall Rating';
return false;
}
if($rootScope.user["name"]=="" && $rootScope.user['phone']=='')
{
$scope.errMsg = 'Please Provide Name or Phone number';
return false;
}

return true;

};
$scope.submit = function() {
if(!$scope.FormComplete())
{
return false;
}
var gen = "like";
	if($scope.data.rating.overall < 4 || $scope.data.rating.food < 4 || $scope.data.rating.ambience < 4 || $scope.data.rating.value <4 || $scope.data.rating.service < 4)
	gen = 'dislike';
var bday = '', ann='';
if($scope.data.birthday.day !="Day"  && $scope.data.birthday.month !="Month")
	bday = $scope.data.birthday.day+"-"+$scope.data.birthday.month;
if($scope.data.anniv.day!="Day"  && $scope.data.anniv.month !="Month")
	ann = $scope.data.anniv.day+"-"+$scope.data.anniv.month;

$scope.fbdata = [
{'name':'que-x','value':'Experience'},
{'name':'ans-x','value':gen},
{'name':'que-0','value':'Birthday'},
{'name':'ans-0','value':bday},
{'name':'que-1','value':'Anniversary'},
{'name':'ans-1','value':ann},
{'name':'que-2','value':'Overall Rating'},
{'name':'ans-2','value':$scope.data.rating.overall},
{'name':'que-3','value':'food'},
{'name':'ans-3','value':$scope.data.rating.food},
{'name':'que-4','value':'service'},
{'name':'ans-4','value':$scope.data.rating.service},
{'name':'que-5','value':'ambience'},
{'name':'ans-5','value':$scope.data.rating.ambience},
{'name':'que-6','value':'value'},
{'name':'ans-6','value':$scope.data.rating.value},
{'name':'que-7','value':'comments'},
{'name':'ans-7','value':$scope.data.comment},
{'name':'que-8','value':'reference'},
{'name':'ans-8','value':$scope.data.reference},
{'name':'formname', 'value':"Yellow Banana Feedbacks"},
{'name':'formid', 'value':"YBFB1"},
];

var userData={
	name:$rootScope.user.name,
	phone:$rootScope.user.phone,
	email:$rootScope.user.email
	};
// $rootScope.send2appBe("feedback","feedback", {ip:$rootScope.user.ip,user:$rootScope.user,fbdata:$scope.fbdata});
// 	$scope.submitted = true;
//
// 	   };
	$rootScope.send2appBe("feedback","feedback", {ip:$rootScope.user.ip,user:$rootScope.user,ud:userData, fbdata:$scope.fbdata});
	if($rootScope.user.local) {
		$rootScope.user['name'] = "";
		$rootScope.user['email'] = "";
		$rootScope.user['phone'] = "";
		for(i in userData) {
			$scope.user[i] = "";
			
		}
	}
	$scope.submitted = true;
	//document.getElementById("form").reset();
//	$rootScope.gotohome();
   }

   $scope.submitsortform = function() {
    var dataAry = $("#shortform" ).serializeArray();
    $scope.shfbdata = {};
    event.preventDefault();
    $scope.shfbdata = dataAry;
    $rootScope.send2appBe("feedback","shortfeedback", {ip:$rootScope.user.ip,user:$rootScope.user, shfbdata:$scope.shfbdata});
//  $rootScope.gotohome();
   }

   $scope.$on('update', function(s){
		console.log("USEr info updated",s);
   })
});