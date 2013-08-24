angular-flickr
==============

A flickr module for angular js. The module includes support for creating a photo gallery, thumbnail view, and all of the directives/filters/services to support it using the Flickr API.

You can view a Flickr "Set" gallery demo here: [www.rustygreen.com/angular-flickr](http://rustygreen.com/angular-flickr?ref=github)

There are no dependencies required for this angular module (other than angular js), but all directives do have pre-set css classes to look good with Bootstrap 3.0 css (Bootstrap javascript is not required - which means no jquery either)

##Installation
Installation is easy since the angular-flickr module has no dependencies:

#####Install with bower:
<pre>bower install angular-flickr</pre>

#####Application:
<pre>// Include the css:
&lt;link rel=&quot;stylesheet&quot; href=&quot;bower_components/angular-flickr/dist/angular-flickr.min.css&quot;&gt;

// Include the js:
&lt;script src=&quot;bower_components/angular-flickr/dist/angular-flickr.min.js&quot;&gt;&lt;/script&gt;

// Add the flickr module as a dependency to your application:
module('myApp', ['flickr'])

// You're good to go! Start using the flickr directives and services...</pre>


Don't use Bower? Shame on you... I suppose you could include the files from here (don't use this in production!):
<pre>&lt;link rel=&quot;stylesheet&quot; href=&quot;https://rawgithub.com/rustygreen/angular-flickr/master/dist/angular-flickr.min.css&quot;&gt;
&lt;script src=&quot;https://rawgithub.com/rustygreen/angular-flickr/master/dist/angular-flickr.min.js&quot;&gt;&lt;/script&gt;</pre>


##Application Configuration
Common configurations related to the Flickr API, as well as default and options, can be set using angular's module value method

<pre>module('myApp').value('flickrConfig', {
    user_id: '99179128@N07',
    api_key: '006d5ace5a1ec6e87d501a2753da1bc7'
  })</pre>

Any service or call that requires a user id or api key will use them from the flickrConfig object. Other application defaults and settings can be set using the flickrConfig object as well:
<pre>module('myApp').value('flickrConfig', {
    user_id: '99179128@N07',
    api_key: '006d5ace5a1ec6e87d501a2753da1bc7',
    photosetThumbnails: {
      autoSelectIndex: 0 // This will automatically select the first thumbnail in a list of thumbnails
    }
  })</pre>
  
All options/defaults for directives, services, and filters can be set by creating a property in the flickrConfig object with the same name as the directive, service, or filter. The best way to understand this and see what options are available is to just look at the code :)


##Directives
Currently only directives and services related to Flickr "Sets" are available but more will be coming. Or you could open a pull request and help :)

###Photoset List Directive
A directive used to show a list of photosets available for a given user_id/api_key
<pre>&lt;photoset-list list-class=&quot;breadcrumb&quot; set=&quot;photoset&quot;&gt;&lt;/photoset-list&gt;</pre>

#####Options
* = sets - the array of flickr sets associated with the user_id to bind to: optional
* = set - the selected set: optional
* = setId - the selected set id: optional
* @ listClass - the class to add to the list of classes. This way you can make it a vertical list or horizontal list: optional
 
###Photoset Thumbnails Directive
A directive used to a list of thumbnails for a given photoset
<pre>&lt;photoset-thumbnails ng-show=&quot;photoset&quot; thumbnail-class=&quot;img-thumbnail&quot; photo=&quot;photo&quot; set-id=&quot;{{photoset.id}}&quot;&gt; &lt;/photoset-thumbnails&gt;</pre>

#####Options
* @ setId - the Set id that you want to display thumbnails for (the directive will go get set information in order to retrieve the thumbnails): optional
* = photo - the selected photo based on the thumbnail (the photo will provide you an api to get different sizes - see the Photoset service for details): optional

###Photoset Slideshow Directive
A directive used to show a slideshow of "larger" images (they don't really have to be larger) but the idea is to show one at a time here
<pre>&lt;photoset-slideshow photo=&quot;photo&quot;&gt;&lt;/photoset-slideshow&gt;</pre>

#####Options
* = photo - the photo to show: optional
* & next - a function to call when the user chooses to show the next photo: optional
* & previous - a function to call when the user chooses to show the previous photo: optional
* & photoClass - a css class to add to the photo markup: optional

###Loading Balls Directive
A directive used to show a flickr loading animation (the blue and pink balls)
<pre>&lt;loading-balls class=&quot;pull-right&quot;&gt;&lt;/loading-balls&gt;</pre>
*Note: This directive requires css and ng-animate functionality so you must be using >= angular 1.1.5

#####Options
* None at this time, will add some in the future
 
###Photoset Panel Directive
A directive used to show a complete photoset "explorer" in a "panel" form
<pre>&lt;photoset-panel panel-title=&quot;Flickr Photo Sets&quot;&gt;&lt;/photoset-panel&gt;</pre>
*Note: This directive is built to be used with Bootstrap 3.0 css

#####Options
* @ panelTitle - the title of the panel


##Services

###Photoset Service
A service used to get a list and details for a Flickr Photoset
<pre>var list = Photoset.query({page:1, per_page:20})
var set = Photoset.get({photoset_id: '123'})
set.photoset.photo[0].small // This is a complete image url to a small version of this image</pre>
*Note: The returned objects are basically the same as the Flickr API returns (yes, their objects are crap) however I add some extras to it like, a complete url for different image sizes

#####Defaults
You can set defaults for this service by setting a property on the flickrConfig object

<pre>module('myApp').value('flickrConfig', {
    photoset: {
      params: {
        common{
            format: 'json'
        },
        get:{
            extras: ''
        },
        query: {
            per_page: 20
        }
      }
    }
  })</pre>

##Filters
No flickr filters currently in place.

##Notes
The current code includes pre-added css classes to support Bootstrap 3.0 css

##Future Development
I will be expanding directives to support non "Set" functionalities, like generic photo querying, tags, etc. I will continue to build all components as small directives that can be grouped together and interact with one another.

##TODOS
* Finish the documentation
* Add Plunkr examples for each of the individual directives and servcies
* Add photosize option in the photoset slideshow directive
