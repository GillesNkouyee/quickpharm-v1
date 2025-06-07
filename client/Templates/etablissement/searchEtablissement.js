import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Medicaments } from '/imports/api/medicaments.js';

import './searchEtablissement.html'

const PAGE_SIZE = 6;

Template.searchEtablissements.onCreated(function () {
  this.searchResults = new ReactiveVar([]);
  this.currentPage = new ReactiveVar(1);
  this.totalResults = new ReactiveVar(0);
  this.lastSearchParams = new ReactiveVar({});
});

Template.searchEtablissements.helpers({
  searchResults() {
    return Template.instance().searchResults.get();
  },
  currentPage() {
    return Template.instance().currentPage.get();
  },
  disabledPrev() {
    return Template.instance().currentPage.get() === 1 ? 'disabled' : '';
  },
  disabledNext() {
    const instance = Template.instance();
    const page = instance.currentPage.get();
    const total = instance.totalResults.get();
    return (page * PAGE_SIZE >= total) ? 'disabled' : '';
  },
  regions() {
    // Extraction des catégories distinctes
    return _.uniq(Etablissements.find({}, { fields: { region: 1 } })
      .fetch()
      .map(med => med.region)
      .filter(Boolean)).sort(); // ignore les valeurs nulles ou vides
  }
});

Template.searchEtablissements.events({
  'submit #search-form'(event, instance) {
    event.preventDefault();
    instance.currentPage.set(1); // reset to page 1

    const nomQuery = event.target.searchQuery.value.trim();
    const selectedType = event.target.typeSelect.value;
    const selectedRegion = event.target.regionSelect.value;

    const filter = {};
    if (nomQuery) {
      filter.nom = { $regex: nomQuery, $options: 'i' };
    }
    if (selectedType) {
      filter.type = selectedType;
    }

    if (selectedType) {
        filter.region = selectedRegion;
      }

    instance.lastSearchParams.set({
      filter
    });

    performSearch(instance);
  },

  'click #reset-form'(event, instance) {
    document.getElementById('search-form').reset();
    instance.searchResults.set([]);
    instance.totalResults.set(0);
    instance.currentPage.set(1);
  },

  'click #prev-page'(event, instance) {
    const current = instance.currentPage.get();
    if (current > 1) {
      instance.currentPage.set(current - 1);
      performSearch(instance);
    }
  },

  'click #next-page'(event, instance) {
    const current = instance.currentPage.get();
    instance.currentPage.set(current + 1);
    performSearch(instance);
  }
});

function performSearch(instance) {
  const { filter } = instance.lastSearchParams.get();
  const page = instance.currentPage.get();

  const skip = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  let cursor = Etablissements.find(filter, {
    skip,
    limit
  });

  const total = Etablissements.find(filter).count();

  instance.totalResults.set(total);
  instance.searchResults.set(cursor.fetch());
}
