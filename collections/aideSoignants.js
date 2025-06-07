AideSoignants = new Mongo.Collection('aideSoignants');

Schemas = {};

AideSoignants.allow({

    insert : function(userId,doc){
    return true;
    },
    update : function(userId,doc,fieldNames,modifier){
    return true;
    },
    remove : function(userId,doc){
    return true;
    },
      fetch: ['owner']
    });
    
AideSoignants.schema = new SimpleSchema({
  nom: { type: String },
  prenom: { type: String },
  specialite: { type: String },
  telephone: { type: String },
  localisation: {
    type: Object,
    optional: true
  },
  'localisation.lat': { type: Number, optional: true },
  'localisation.lng': { type: Number, optional: true },
  disponible: { type: Boolean, defaultValue: true },
  dernierAppel: { type: Date, optional: true },
 createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
    if (this.isInsert) {
    return new Date;
  }
},
autoform: {
    type:"hidden"
  }
},
addedBy: {
  type: String,
  label: "Created By",
  autoValue: function() {
  if (this.isInsert) {
  return this.userId;
}
},
autoform: {
  type:"hidden"
}
},
updatedAt: {
    type: Date,
    label: "Updated At",
    autoValue: function() {
    if (this.isUpdate) {
    return new Date();
  }
},
  autoform: {
    type:"hidden"
  },
  denyInsert: true,
  optional: true
},
});

AideSoignants.attachSchema(AideSoignants.schema);
