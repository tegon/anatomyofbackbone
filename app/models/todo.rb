class Todo < ActiveRecord::Base
  validates_presence_of :description, :status
end