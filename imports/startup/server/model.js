import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Inject} from 'meteor/meteorhacks:inject-initial';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { EJSON } from 'meteor/ejson';

Meteor.startup(function () {
  Sources = new Mongo.Collection('Sources');
  JobStreetSources = new Mongo.Collection('JobStreetSources');
  SourceItems = new Mongo.Collection('SourceItems');
  JobStreetItems = new Mongo.Collection('JobStreetItems');

  // Sources Schema and Permissions
  Sources.schema = new SimpleSchema({
    sourceName: {
      type: String,
      optional: true,
      defaultValue: 'monster',
    },
    sourceIndustry: {
      type: String,
      optional: true,
    },
    sourceUrl: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true
    },
    sourceSpecialization: {
      type: String,
      optional: true,
      defaultValue: null
    }
  });
  Sources.attachSchema(Sources.schema);
  Sources.allow({
  	insert: function (userId, doc) {
  		return true;
  	}
  });

  // JobStreetSources Schema and Permissions
  JobStreetSources.schema = new SimpleSchema({
    sourceName: {
      type: String,
      optional: true,
      defaultValue: 'jobstreet'
    },
    sourceIndustry: {
      type: String,
      optional: true
    },
    sourceUrl: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true
    },
    sourceSpecialization: {
      type: String,
      optional: true
    },
    sourceSearchDepth: {
      type: Number,
      optional: true
    },
    sourceSpecializationCode: {
      type: Number,
      optional: true
    }
  });
  JobStreetSources.attachSchema(JobStreetSources.schema);
  JobStreetSources.allow({
    insert: function (userId, doc) {
      return true;
    }
  });


  // SourceItems Schema and Permissions
  SourceItems.schema = new SimpleSchema({
    title: {
      type: String,
      optional: true
    },
    url: {
      type: String,
      regEx: SimpleSchema.RegEx.Url
    },
    sourceId: {
      type: String,
      optional: true
    },
    itemGuid: {
      type: String,
      optional: true
    },
    sourceIndustry: {
      type: String,
      optional: true,
    },
    htmlDescription: {
      type: String,
      optional: true
    },
    description: {
      type: String,
      label: 'Raw Description',
      optional: true
    },
    parsedKeywords: {
      type: [String],
      label: 'parsedKeywords keywords',
      optional: true
    },
    company: {
      type: String,
      optional: true
    },
    experience: {
      type: String,
      optional: true
    },
    qualification: {
      type: String,
      optional: true
    },
    location: {
      type: String,
      optional: true
    },
    pubDate: {
      type: String,
      optional: true
    },
    postedAt: {
      type: String,
      optional: true
    }
  });

  SourceItems.attachSchema(SourceItems.schema);
  SourceItems.allow({
    insert: function (userId, doc) {
      return true;
    }
  });

  // JobStreetItems Schema and Permissions
  JobStreetItems.schema = new SimpleSchema({
    title: {
      type: String,
      optional: true
    },
    url: {
      type: String,
      regEx: SimpleSchema.RegEx.Url
    },
    sourceId: {
      type: String,
      optional: true
    },
    description: {
      type: String,
      label: 'Raw Description',
      optional: true
    },
    parsedKeywords: {
      type: [String],
      label: 'parsedKeywords keywords',
      optional: true
    },
    company: {
      type: String,
      optional: true
    },
    experience: {
      type: String,
      optional: true
    },

    location: {
      type: String,
      optional: true
    },
    sourceIndustry: {
      type: String,
      optional: true
    },
    sourceSpecialization: {
      type: String,
      optional: true
    },
  });
  JobStreetItems.attachSchema(JobStreetItems.schema);
  JobStreetItems.allow({
    insert: function (userId, doc) {
      return true;
    }
  });
});


Inject.rawModHtml('addUnresolved',function(html){
  return html = html.replace('<body>', '<body unresolved>');
});
