angular-flickr
==============

A flickr module for angular js. The module includes support for creating a photo gallery, thumbnail view, and all of the directives/filters/services to support it using the Flickr API.

You can view a Flickr "Set" gallery demo here: [www.rustygreen.com/angular-flickr](http://rustygreen.com/angular-flickr?ref=github)

There are no dependencies required for this angular module (other than angular js), but all directives do have pre-set css classes to look good in Bootstrap 3.0

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

####Photoset List Directive
A directive used to show a list of photosets available for a given user_id/api_key
<pre>&lt;photoset-list list-class=&quot;breadcrumb&quot; set=&quot;photoset&quot;&gt;&lt;/photoset-list&gt;</pre>

#####Options
* = sets - the array of flickr sets associated with the user_id to bind to: optional
* = set - the selected set: optional
* = setId - the selected set id: optional
* @ listClass - the class to add to the list of classes. This way you can make it a vertical list or horizontal list: optional
 
####Photoset Thumbnails Directive
A directive used to a list of thumbnails for a given photoset
<pre>&lt;photoset-thumbnails ng-show=&quot;photoset&quot; thumbnail-class=&quot;img-thumbnail&quot; photo=&quot;photo&quot; set-id=&quot;{{photoset.id}}&quot;&gt; &lt;/photoset-thumbnails&gt;</pre>

#####Options
* @ setId - the Set id that you want to display thumbnails for (the directive will go get set information in order to retrieve the thumbnails): optional
* = photo - the selected photo based on the thumbnail (the photo will provide you an api to get different sizes - see the Photoset service for details): optional

##Services

##Filters

##Notes
The current code includes pre-added css classes to support Bootstrap 3.0 css

##Future Development
