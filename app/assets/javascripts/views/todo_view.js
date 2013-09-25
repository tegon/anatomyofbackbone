window.TodoView = Backbone.View.extend({
  template: _.template('<h3 class="<%= status %>"><input class="toggle" type=checkbox <%= status == "complete" ? "checked=checked" : "" %>/> <label><%= description %></label><input class="edit" value="<%= description %>"> <a href="/#todos/<%= id %>">☞</a></h3>'),

  events: {
    'click .toggle': 'toggleStatus',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy hide', this.remove, this);
  },

  edit: function(){
    this.input.addClass('editing');
    this.input.focus();
  },

  close: function(){
    value = this.input.val().trim();
    if(value != this.model.get('description')){
      this.model.changeDescription(value);
    }
    this.input.removeClass('editing');
  },

  updateOnEnter: function(e){
    if(e.which == 13){
      this.close();
    }
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit')
    return this;
  },

  remove: function(){
    this.$el.remove();
  },

  toggleStatus: function(){
    this.model.toggleStatus()
  }
});

