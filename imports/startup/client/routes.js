import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

import '/imports/ui/layouts/app_layout.js';
import '/imports/pages/about/about.js';

Router.configure({
  layoutTemplate: 'app_layout',
  // loadingTemplate: 'loading',
  // not_foundTemplate: 'notFound'
  // autoRender: true,
  // autoStart: false
  // waitOn: function () {this.next();},
});

Router.map(function(){
  this.route('about', {
    path: '/',
    template:'about'
  });
});