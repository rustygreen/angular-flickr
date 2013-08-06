angular-flickr
==============

A flickr module for angular js. The module includes support for creating a photo gallery, thumbnail view, and all of the directives/filters/services to support it using the Flickr API.

You can view a Flickr "Set" gallery demo here: [www.rustygreen.com/angular-flickr](http://rustygreen.com/angular-flickr?ref=github)

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
<pre>&lt;photoset-list list-class=&quot;breadcrumb&quot; set=&quot;photoset&quot;&gt;&lt;/photoset-list&gt;</pre>

#####Options
* = sets - the array of flickr sets associated with the user_id to bind to: optional
* = set - the selected set: optional
* = setId - the selected set id: optional
* @ listClass - the class to add to the list of classes. This way you can make it a vertical list or horizontal list: optional

##Services

##Filters

##Notes

##Future Development
